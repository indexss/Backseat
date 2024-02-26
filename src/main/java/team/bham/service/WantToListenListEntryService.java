package team.bham.service;

import java.util.List;
import java.util.Optional;
import team.bham.service.dto.WantToListenListEntryDTO;

/**
 * Service Interface for managing {@link team.bham.domain.WantToListenListEntry}.
 */
public interface WantToListenListEntryService {
    /**
     * Save a wantToListenListEntry.
     *
     * @param wantToListenListEntryDTO the entity to save.
     * @return the persisted entity.
     */
    WantToListenListEntryDTO save(WantToListenListEntryDTO wantToListenListEntryDTO);

    /**
     * Updates a wantToListenListEntry.
     *
     * @param wantToListenListEntryDTO the entity to update.
     * @return the persisted entity.
     */
    WantToListenListEntryDTO update(WantToListenListEntryDTO wantToListenListEntryDTO);

    /**
     * Partially updates a wantToListenListEntry.
     *
     * @param wantToListenListEntryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WantToListenListEntryDTO> partialUpdate(WantToListenListEntryDTO wantToListenListEntryDTO);

    /**
     * Get all the wantToListenListEntries.
     *
     * @return the list of entities.
     */
    List<WantToListenListEntryDTO> findAll();

    /**
     * Get the "id" wantToListenListEntry.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WantToListenListEntryDTO> findOne(Long id);

    /**
     * Delete the "id" wantToListenListEntry.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
