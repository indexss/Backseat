package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.SpotifyConnection;
import team.bham.service.dto.SpotifyConnectionDTO;

/**
 * Mapper for the entity {@link SpotifyConnection} and its DTO {@link SpotifyConnectionDTO}.
 */
@Mapper(componentModel = "spring")
public interface SpotifyConnectionMapper extends EntityMapper<SpotifyConnectionDTO, SpotifyConnection> {}
