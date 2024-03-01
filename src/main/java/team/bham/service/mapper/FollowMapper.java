package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Follow;
import team.bham.service.dto.FollowDTO;

/**
 * Mapper for the entity {@link Follow} and its DTO {@link FollowDTO}.
 */
@Mapper(componentModel = "spring")
public interface FollowMapper extends EntityMapper<FollowDTO, Follow> {}
