package team.bham.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import team.bham.service.dto.TrackDTO;

/**
 * Service Interface for managing {@link team.bham.domain.Track}.
 */
public interface TrackService {
    /**
     * Save a track.
     *
     * @param trackDTO the entity to save.
     * @return the persisted entity.
     */
    TrackDTO save(TrackDTO trackDTO);

    /**
     * Updates a track.
     *
     * @param trackDTO the entity to update.
     * @return the persisted entity.
     */
    TrackDTO update(TrackDTO trackDTO);

    /**
     * Partially updates a track.
     *
     * @param trackDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TrackDTO> partialUpdate(TrackDTO trackDTO);

    /**
     * Get all the tracks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrackDTO> findAll(Pageable pageable);

    /**
     * Get all the tracks with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrackDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" track.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrackDTO> findOne(Long id);

    /**
     * Delete the "id" track.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
