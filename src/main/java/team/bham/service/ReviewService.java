package team.bham.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import team.bham.service.dto.ReviewDTO;

/**
 * Service Interface for managing {@link team.bham.domain.Review}.
 */
public interface ReviewService {
    /**
     * Save a review.
     *
     * @param reviewDTO the entity to save.
     * @return the persisted entity.
     */
    ReviewDTO save(ReviewDTO reviewDTO);

    /**
     * Updates a review.
     *
     * @param reviewDTO the entity to update.
     * @return the persisted entity.
     */
    ReviewDTO update(ReviewDTO reviewDTO);

    /**
     * Partially updates a review.
     *
     * @param reviewDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ReviewDTO> partialUpdate(ReviewDTO reviewDTO);

    /**
     * Get all the reviews.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReviewDTO> findAll(Pageable pageable);

    /**
     * Get the "id" review.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReviewDTO> findOne(Long id);

    /**
     * Delete the "id" review.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
