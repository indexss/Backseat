package team.bham.service;

import java.util.List;
import java.util.Optional;
import team.bham.service.dto.SpotifyConnectionDTO;

/**
 * Service Interface for managing {@link team.bham.domain.SpotifyConnection}.
 */
public interface SpotifyConnectionService {
    /**
     * Save a spotifyConnection.
     *
     * @param spotifyConnectionDTO the entity to save.
     * @return the persisted entity.
     */
    SpotifyConnectionDTO save(SpotifyConnectionDTO spotifyConnectionDTO);

    /**
     * Updates a spotifyConnection.
     *
     * @param spotifyConnectionDTO the entity to update.
     * @return the persisted entity.
     */
    SpotifyConnectionDTO update(SpotifyConnectionDTO spotifyConnectionDTO);

    /**
     * Partially updates a spotifyConnection.
     *
     * @param spotifyConnectionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SpotifyConnectionDTO> partialUpdate(SpotifyConnectionDTO spotifyConnectionDTO);

    /**
     * Get all the spotifyConnections.
     *
     * @return the list of entities.
     */
    List<SpotifyConnectionDTO> findAll();
    /**
     * Get all the SpotifyConnectionDTO where Profile is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<SpotifyConnectionDTO> findAllWhereProfileIsNull();

    /**
     * Get the "id" spotifyConnection.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SpotifyConnectionDTO> findOne(String id);

    /**
     * Delete the "id" spotifyConnection.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
