package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Album;
import team.bham.domain.Profile;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ProfileDTO;
import team.bham.service.dto.ReviewDTO;
import team.bham.service.dto.TrackDTO;

/**
 * Mapper for the entity {@link Review} and its DTO {@link ReviewDTO}.
 */
@Mapper(componentModel = "spring")
public interface ReviewMapper extends EntityMapper<ReviewDTO, Review> {
    @Mapping(target = "profile", source = "profile", qualifiedByName = "profileId")
    @Mapping(target = "track", source = "track", qualifiedByName = "trackSpotifyURI")
    @Mapping(target = "album", source = "album", qualifiedByName = "albumSpotifyURI")
    ReviewDTO toDto(Review s);

    @Named("profileId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProfileDTO toDtoProfileId(Profile profile);

    @Named("trackSpotifyURI")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "spotifyURI", source = "spotifyURI")
    TrackDTO toDtoTrackSpotifyURI(Track track);

    @Named("albumSpotifyURI")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "spotifyURI", source = "spotifyURI")
    AlbumDTO toDtoAlbumSpotifyURI(Album album);
}
