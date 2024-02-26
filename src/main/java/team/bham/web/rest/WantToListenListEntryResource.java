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
import team.bham.repository.WantToListenListEntryRepository;
import team.bham.service.WantToListenListEntryService;
import team.bham.service.dto.WantToListenListEntryDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.WantToListenListEntry}.
 */
@RestController
@RequestMapping("/api")
public class WantToListenListEntryResource {

    private final Logger log = LoggerFactory.getLogger(WantToListenListEntryResource.class);

    private static final String ENTITY_NAME = "wantToListenListEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WantToListenListEntryService wantToListenListEntryService;

    private final WantToListenListEntryRepository wantToListenListEntryRepository;

    public WantToListenListEntryResource(
        WantToListenListEntryService wantToListenListEntryService,
        WantToListenListEntryRepository wantToListenListEntryRepository
    ) {
        this.wantToListenListEntryService = wantToListenListEntryService;
        this.wantToListenListEntryRepository = wantToListenListEntryRepository;
    }

    /**
     * {@code POST  /want-to-listen-list-entries} : Create a new wantToListenListEntry.
     *
     * @param wantToListenListEntryDTO the wantToListenListEntryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new wantToListenListEntryDTO, or with status {@code 400 (Bad Request)} if the wantToListenListEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/want-to-listen-list-entries")
    public ResponseEntity<WantToListenListEntryDTO> createWantToListenListEntry(
        @Valid @RequestBody WantToListenListEntryDTO wantToListenListEntryDTO
    ) throws URISyntaxException {
        log.debug("REST request to save WantToListenListEntry : {}", wantToListenListEntryDTO);
        if (wantToListenListEntryDTO.getId() != null) {
            throw new BadRequestAlertException("A new wantToListenListEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WantToListenListEntryDTO result = wantToListenListEntryService.save(wantToListenListEntryDTO);
        return ResponseEntity
            .created(new URI("/api/want-to-listen-list-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /want-to-listen-list-entries/:id} : Updates an existing wantToListenListEntry.
     *
     * @param id the id of the wantToListenListEntryDTO to save.
     * @param wantToListenListEntryDTO the wantToListenListEntryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wantToListenListEntryDTO,
     * or with status {@code 400 (Bad Request)} if the wantToListenListEntryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the wantToListenListEntryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/want-to-listen-list-entries/{id}")
    public ResponseEntity<WantToListenListEntryDTO> updateWantToListenListEntry(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody WantToListenListEntryDTO wantToListenListEntryDTO
    ) throws URISyntaxException {
        log.debug("REST request to update WantToListenListEntry : {}, {}", id, wantToListenListEntryDTO);
        if (wantToListenListEntryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wantToListenListEntryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wantToListenListEntryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WantToListenListEntryDTO result = wantToListenListEntryService.update(wantToListenListEntryDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, wantToListenListEntryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /want-to-listen-list-entries/:id} : Partial updates given fields of an existing wantToListenListEntry, field will ignore if it is null
     *
     * @param id the id of the wantToListenListEntryDTO to save.
     * @param wantToListenListEntryDTO the wantToListenListEntryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wantToListenListEntryDTO,
     * or with status {@code 400 (Bad Request)} if the wantToListenListEntryDTO is not valid,
     * or with status {@code 404 (Not Found)} if the wantToListenListEntryDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the wantToListenListEntryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/want-to-listen-list-entries/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WantToListenListEntryDTO> partialUpdateWantToListenListEntry(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody WantToListenListEntryDTO wantToListenListEntryDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update WantToListenListEntry partially : {}, {}", id, wantToListenListEntryDTO);
        if (wantToListenListEntryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wantToListenListEntryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wantToListenListEntryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WantToListenListEntryDTO> result = wantToListenListEntryService.partialUpdate(wantToListenListEntryDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, wantToListenListEntryDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /want-to-listen-list-entries} : get all the wantToListenListEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wantToListenListEntries in body.
     */
    @GetMapping("/want-to-listen-list-entries")
    public List<WantToListenListEntryDTO> getAllWantToListenListEntries() {
        log.debug("REST request to get all WantToListenListEntries");
        return wantToListenListEntryService.findAll();
    }

    /**
     * {@code GET  /want-to-listen-list-entries/:id} : get the "id" wantToListenListEntry.
     *
     * @param id the id of the wantToListenListEntryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wantToListenListEntryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/want-to-listen-list-entries/{id}")
    public ResponseEntity<WantToListenListEntryDTO> getWantToListenListEntry(@PathVariable Long id) {
        log.debug("REST request to get WantToListenListEntry : {}", id);
        Optional<WantToListenListEntryDTO> wantToListenListEntryDTO = wantToListenListEntryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wantToListenListEntryDTO);
    }

    /**
     * {@code DELETE  /want-to-listen-list-entries/:id} : delete the "id" wantToListenListEntry.
     *
     * @param id the id of the wantToListenListEntryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/want-to-listen-list-entries/{id}")
    public ResponseEntity<Void> deleteWantToListenListEntry(@PathVariable Long id) {
        log.debug("REST request to delete WantToListenListEntry : {}", id);
        wantToListenListEntryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
