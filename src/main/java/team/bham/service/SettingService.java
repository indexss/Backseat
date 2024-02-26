package team.bham.service;

import java.util.List;
import java.util.Optional;
import team.bham.service.dto.SettingDTO;

/**
 * Service Interface for managing {@link team.bham.domain.Setting}.
 */
public interface SettingService {
    /**
     * Save a setting.
     *
     * @param settingDTO the entity to save.
     * @return the persisted entity.
     */
    SettingDTO save(SettingDTO settingDTO);

    /**
     * Updates a setting.
     *
     * @param settingDTO the entity to update.
     * @return the persisted entity.
     */
    SettingDTO update(SettingDTO settingDTO);

    /**
     * Partially updates a setting.
     *
     * @param settingDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SettingDTO> partialUpdate(SettingDTO settingDTO);

    /**
     * Get all the settings.
     *
     * @return the list of entities.
     */
    List<SettingDTO> findAll();

    /**
     * Get the "id" setting.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SettingDTO> findOne(Long id);

    /**
     * Delete the "id" setting.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
