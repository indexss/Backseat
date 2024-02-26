package team.bham.service;

import java.util.List;
import java.util.Optional;
import team.bham.service.dto.FollowDTO;

/**
 * Service Interface for managing {@link team.bham.domain.Follow}.
 */
public interface FollowService {
    /**
     * Save a follow.
     *
     * @param followDTO the entity to save.
     * @return the persisted entity.
     */
    FollowDTO save(FollowDTO followDTO);

    /**
     * Updates a follow.
     *
     * @param followDTO the entity to update.
     * @return the persisted entity.
     */
    FollowDTO update(FollowDTO followDTO);

    /**
     * Partially updates a follow.
     *
     * @param followDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FollowDTO> partialUpdate(FollowDTO followDTO);

    /**
     * Get all the follows.
     *
     * @return the list of entities.
     */
    List<FollowDTO> findAll();

    /**
     * Get the "id" follow.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FollowDTO> findOne(Long id);

    /**
     * Delete the "id" follow.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
