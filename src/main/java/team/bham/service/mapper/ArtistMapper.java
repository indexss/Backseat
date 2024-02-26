package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Artist;
import team.bham.service.dto.ArtistDTO;

/**
 * Mapper for the entity {@link Artist} and its DTO {@link ArtistDTO}.
 */
@Mapper(componentModel = "spring")
public interface ArtistMapper extends EntityMapper<ArtistDTO, Artist> {}
