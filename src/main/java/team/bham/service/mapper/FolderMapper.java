package team.bham.service.mapper;

import org.mapstruct.*;
import team.bham.domain.Folder;
import team.bham.domain.Profile;
import team.bham.service.dto.FolderDTO;
import team.bham.service.dto.ProfileDTO;

/**
 * Mapper for the entity {@link Folder} and its DTO {@link FolderDTO}.
 */
@Mapper(componentModel = "spring")
public interface FolderMapper extends EntityMapper<FolderDTO, Folder> {
    @Mapping(target = "profile", source = "profile", qualifiedByName = "profileId")
    FolderDTO toDto(Folder s);

    @Named("profileId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProfileDTO toDtoProfileId(Profile profile);
}
