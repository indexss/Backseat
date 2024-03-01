package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.WantToListenListEntry;
import team.bham.service.dto.WantToListenListEntryDTO;

/**
 * Mapper for the entity {@link WantToListenListEntry} and its DTO {@link WantToListenListEntryDTO}.
 */
@Mapper(componentModel = "spring")
public interface WantToListenListEntryMapper extends EntityMapper<WantToListenListEntryDTO, WantToListenListEntry> {}
