package team.bham.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ArtistDTO;

/**
 * Mapper for the entity {@link Album} and its DTO {@link AlbumDTO}.
 */
@Mapper(componentModel = "spring")
public interface AlbumMapper extends EntityMapper<AlbumDTO, Album> {
    @Mapping(target = "artists", source = "artists", qualifiedByName = "artistIdSet")
    AlbumDTO toDto(Album s);

    @Mapping(target = "removeArtist", ignore = true)
    Album toEntity(AlbumDTO albumDTO);

    @Named("artistId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArtistDTO toDtoArtistId(Artist artist);

    @Named("artistIdSet")
    default Set<ArtistDTO> toDtoArtistIdSet(Set<Artist> artist) {
        return artist.stream().map(this::toDtoArtistId).collect(Collectors.toSet());
    }
}
