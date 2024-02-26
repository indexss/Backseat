package team.bham.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.Track;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ArtistDTO;
import team.bham.service.dto.TrackDTO;

/**
 * Mapper for the entity {@link Track} and its DTO {@link TrackDTO}.
 */
@Mapper(componentModel = "spring")
public interface TrackMapper extends EntityMapper<TrackDTO, Track> {
    @Mapping(target = "artists", source = "artists", qualifiedByName = "artistIdSet")
    @Mapping(target = "album", source = "album", qualifiedByName = "albumId")
    TrackDTO toDto(Track s);

    @Mapping(target = "removeArtist", ignore = true)
    Track toEntity(TrackDTO trackDTO);

    @Named("artistId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArtistDTO toDtoArtistId(Artist artist);

    @Named("artistIdSet")
    default Set<ArtistDTO> toDtoArtistIdSet(Set<Artist> artist) {
        return artist.stream().map(this::toDtoArtistId).collect(Collectors.toSet());
    }

    @Named("albumId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AlbumDTO toDtoAlbumId(Album album);
}
