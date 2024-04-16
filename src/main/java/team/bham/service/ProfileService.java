package team.bham.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import team.bham.domain.User;
import team.bham.service.dto.ProfileDTO;
import team.bham.web.rest.vm.ManagedUserVM;

/**
 * Service Interface for managing {@link team.bham.domain.Profile}.
 */
public interface ProfileService {
    void createWhenRegister(User user);

    /**
     * Save a profile.
     *
     * @param profileDTO the entity to save.
     * @return the persisted entity.
     */
    ProfileDTO save(ProfileDTO profileDTO);

    /**
     * Updates a profile.
     *
     * @param profileDTO the entity to update.
     * @return the persisted entity.
     */
    ProfileDTO update(ProfileDTO profileDTO);

    /**
     * Partially updates a profile.
     *
     * @param profileDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProfileDTO> partialUpdate(ProfileDTO profileDTO);

    /**
     * Get all the profiles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProfileDTO> findAll(Pageable pageable);

    /**
     * Get the "id" profile.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProfileDTO> findOne(Long id);

    /**
     * Delete the "id" profile.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
