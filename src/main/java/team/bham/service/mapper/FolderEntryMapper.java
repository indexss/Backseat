package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Folder;
import team.bham.domain.FolderEntry;
import team.bham.service.dto.FolderDTO;
import team.bham.service.dto.FolderEntryDTO;

/**
 * Mapper for the entity {@link FolderEntry} and its DTO {@link FolderEntryDTO}.
 */
@Mapper(componentModel = "spring")
public interface FolderEntryMapper extends EntityMapper<FolderEntryDTO, FolderEntry> {
    @Mapping(target = "folder", source = "folder", qualifiedByName = "folderId")
    FolderEntryDTO toDto(FolderEntry s);

    @Named("folderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FolderDTO toDtoFolderId(Folder folder);
}
