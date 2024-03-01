package team.bham.service;

import java.util.List;
import java.util.Optional;
import team.bham.service.dto.FolderDTO;

/**
 * Service Interface for managing {@link team.bham.domain.Folder}.
 */
public interface FolderService {
    /**
     * Save a folder.
     *
     * @param folderDTO the entity to save.
     * @return the persisted entity.
     */
    FolderDTO save(FolderDTO folderDTO);

    /**
     * Updates a folder.
     *
     * @param folderDTO the entity to update.
     * @return the persisted entity.
     */
    FolderDTO update(FolderDTO folderDTO);

    /**
     * Partially updates a folder.
     *
     * @param folderDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FolderDTO> partialUpdate(FolderDTO folderDTO);

    /**
     * Get all the folders.
     *
     * @return the list of entities.
     */
    List<FolderDTO> findAll();

    /**
     * Get the "id" folder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FolderDTO> findOne(Long id);

    /**
     * Delete the "id" folder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
