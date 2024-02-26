package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Profile;
import team.bham.domain.SpotifyConnection;
import team.bham.domain.User;
import team.bham.service.dto.ProfileDTO;
import team.bham.service.dto.SpotifyConnectionDTO;
import team.bham.service.dto.UserDTO;

/**
 * Mapper for the entity {@link Profile} and its DTO {@link ProfileDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProfileMapper extends EntityMapper<ProfileDTO, Profile> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    @Mapping(target = "spotifyConnection", source = "spotifyConnection", qualifiedByName = "spotifyConnectionId")
    ProfileDTO toDto(Profile s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);

    @Named("spotifyConnectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SpotifyConnectionDTO toDtoSpotifyConnectionId(SpotifyConnection spotifyConnection);
}
