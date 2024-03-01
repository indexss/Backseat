package team.bham.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team.bham.repository.SettingRepository;
import team.bham.service.SettingService;
import team.bham.service.dto.SettingDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.Setting}.
 */
@RestController
@RequestMapping("/api")
public class SettingResource {

    private final Logger log = LoggerFactory.getLogger(SettingResource.class);

    private static final String ENTITY_NAME = "setting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SettingService settingService;

    private final SettingRepository settingRepository;

    public SettingResource(SettingService settingService, SettingRepository settingRepository) {
        this.settingService = settingService;
        this.settingRepository = settingRepository;
    }

    /**
     * {@code POST  /settings} : Create a new setting.
     *
     * @param settingDTO the settingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new settingDTO, or with status {@code 400 (Bad Request)} if the setting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/settings")
    public ResponseEntity<SettingDTO> createSetting(@Valid @RequestBody SettingDTO settingDTO) throws URISyntaxException {
        log.debug("REST request to save Setting : {}", settingDTO);
        if (settingDTO.getId() != null) {
            throw new BadRequestAlertException("A new setting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SettingDTO result = settingService.save(settingDTO);
        return ResponseEntity
            .created(new URI("/api/settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /settings/:id} : Updates an existing setting.
     *
     * @param id the id of the settingDTO to save.
     * @param settingDTO the settingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated settingDTO,
     * or with status {@code 400 (Bad Request)} if the settingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the settingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/settings/{id}")
    public ResponseEntity<SettingDTO> updateSetting(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SettingDTO settingDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Setting : {}, {}", id, settingDTO);
        if (settingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, settingDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!settingRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SettingDTO result = settingService.update(settingDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, settingDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /settings/:id} : Partial updates given fields of an existing setting, field will ignore if it is null
     *
     * @param id the id of the settingDTO to save.
     * @param settingDTO the settingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated settingDTO,
     * or with status {@code 400 (Bad Request)} if the settingDTO is not valid,
     * or with status {@code 404 (Not Found)} if the settingDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the settingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/settings/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SettingDTO> partialUpdateSetting(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SettingDTO settingDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Setting partially : {}, {}", id, settingDTO);
        if (settingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, settingDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!settingRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SettingDTO> result = settingService.partialUpdate(settingDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, settingDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /settings} : get all the settings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of settings in body.
     */
    @GetMapping("/settings")
    public List<SettingDTO> getAllSettings() {
        log.debug("REST request to get all Settings");
        return settingService.findAll();
    }

    /**
     * {@code GET  /settings/:id} : get the "id" setting.
     *
     * @param id the id of the settingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the settingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/settings/{id}")
    public ResponseEntity<SettingDTO> getSetting(@PathVariable Long id) {
        log.debug("REST request to get Setting : {}", id);
        Optional<SettingDTO> settingDTO = settingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(settingDTO);
    }

    /**
     * {@code DELETE  /settings/:id} : delete the "id" setting.
     *
     * @param id the id of the settingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/settings/{id}")
    public ResponseEntity<Void> deleteSetting(@PathVariable Long id) {
        log.debug("REST request to delete Setting : {}", id);
        settingService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
