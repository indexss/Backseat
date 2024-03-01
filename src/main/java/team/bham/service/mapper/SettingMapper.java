package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Setting;
import team.bham.service.dto.SettingDTO;

/**
 * Mapper for the entity {@link Setting} and its DTO {@link SettingDTO}.
 */
@Mapper(componentModel = "spring")
public interface SettingMapper extends EntityMapper<SettingDTO, Setting> {}
