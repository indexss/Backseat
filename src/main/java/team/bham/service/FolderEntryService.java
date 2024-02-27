package team.bham.service;

import java.util.List;
import java.util.Optional;
import team.bham.service.dto.FolderEntryDTO;

/**
 * Service Interface for managing {@link team.bham.domain.FolderEntry}.
 */
public interface FolderEntryService {
    /**
     * Save a folderEntry.
     *
     * @param folderEntryDTO the entity to save.
     * @return the persisted entity.
     */
    FolderEntryDTO save(FolderEntryDTO folderEntryDTO);

    /**
     * Updates a folderEntry.
     *
     * @param folderEntryDTO the entity to update.
     * @return the persisted entity.
     */
    FolderEntryDTO update(FolderEntryDTO folderEntryDTO);

    /**
     * Partially updates a folderEntry.
     *
     * @param folderEntryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FolderEntryDTO> partialUpdate(FolderEntryDTO folderEntryDTO);

    /**
     * Get all the folderEntries.
     *
     * @return the list of entities.
     */
    List<FolderEntryDTO> findAll();

    /**
     * Get the "id" folderEntry.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FolderEntryDTO> findOne(Long id);

    /**
     * Delete the "id" folderEntry.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
