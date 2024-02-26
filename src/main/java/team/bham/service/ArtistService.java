package team.bham.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import team.bham.service.dto.ArtistDTO;

/**
 * Service Interface for managing {@link team.bham.domain.Artist}.
 */
public interface ArtistService {
    /**
     * Save a artist.
     *
     * @param artistDTO the entity to save.
     * @return the persisted entity.
     */
    ArtistDTO save(ArtistDTO artistDTO);

    /**
     * Updates a artist.
     *
     * @param artistDTO the entity to update.
     * @return the persisted entity.
     */
    ArtistDTO update(ArtistDTO artistDTO);

    /**
     * Partially updates a artist.
     *
     * @param artistDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ArtistDTO> partialUpdate(ArtistDTO artistDTO);

    /**
     * Get all the artists.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ArtistDTO> findAll(Pageable pageable);

    /**
     * Get the "id" artist.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ArtistDTO> findOne(Long id);

    /**
     * Delete the "id" artist.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
