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
import team.bham.repository.FolderEntryRepository;
import team.bham.service.FolderEntryService;
import team.bham.service.dto.FolderEntryDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.FolderEntry}.
 */
@RestController
@RequestMapping("/api")
public class FolderEntryResource {

    private final Logger log = LoggerFactory.getLogger(FolderEntryResource.class);

    private static final String ENTITY_NAME = "folderEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FolderEntryService folderEntryService;

    private final FolderEntryRepository folderEntryRepository;

    public FolderEntryResource(FolderEntryService folderEntryService, FolderEntryRepository folderEntryRepository) {
        this.folderEntryService = folderEntryService;
        this.folderEntryRepository = folderEntryRepository;
    }

    /**
     * {@code POST  /folder-entries} : Create a new folderEntry.
     *
     * @param folderEntryDTO the folderEntryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new folderEntryDTO, or with status {@code 400 (Bad Request)} if the folderEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/folder-entries")
    public ResponseEntity<FolderEntryDTO> createFolderEntry(@Valid @RequestBody FolderEntryDTO folderEntryDTO) throws URISyntaxException {
        log.debug("REST request to save FolderEntry : {}", folderEntryDTO);
        if (folderEntryDTO.getId() != null) {
            throw new BadRequestAlertException("A new folderEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FolderEntryDTO result = folderEntryService.save(folderEntryDTO);
        return ResponseEntity
            .created(new URI("/api/folder-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /folder-entries/:id} : Updates an existing folderEntry.
     *
     * @param id the id of the folderEntryDTO to save.
     * @param folderEntryDTO the folderEntryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated folderEntryDTO,
     * or with status {@code 400 (Bad Request)} if the folderEntryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the folderEntryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/folder-entries/{id}")
    public ResponseEntity<FolderEntryDTO> updateFolderEntry(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FolderEntryDTO folderEntryDTO
    ) throws URISyntaxException {
        log.debug("REST request to update FolderEntry : {}, {}", id, folderEntryDTO);
        if (folderEntryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, folderEntryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!folderEntryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FolderEntryDTO result = folderEntryService.update(folderEntryDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, folderEntryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /folder-entries/:id} : Partial updates given fields of an existing folderEntry, field will ignore if it is null
     *
     * @param id the id of the folderEntryDTO to save.
     * @param folderEntryDTO the folderEntryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated folderEntryDTO,
     * or with status {@code 400 (Bad Request)} if the folderEntryDTO is not valid,
     * or with status {@code 404 (Not Found)} if the folderEntryDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the folderEntryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/folder-entries/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FolderEntryDTO> partialUpdateFolderEntry(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FolderEntryDTO folderEntryDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update FolderEntry partially : {}, {}", id, folderEntryDTO);
        if (folderEntryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, folderEntryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!folderEntryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FolderEntryDTO> result = folderEntryService.partialUpdate(folderEntryDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, folderEntryDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /folder-entries} : get all the folderEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of folderEntries in body.
     */
    @GetMapping("/folder-entries")
    public List<FolderEntryDTO> getAllFolderEntries() {
        log.debug("REST request to get all FolderEntries");
        return folderEntryService.findAll();
    }

    /**
     * {@code GET  /folder-entries/:id} : get the "id" folderEntry.
     *
     * @param id the id of the folderEntryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the folderEntryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/folder-entries/{id}")
    public ResponseEntity<FolderEntryDTO> getFolderEntry(@PathVariable Long id) {
        log.debug("REST request to get FolderEntry : {}", id);
        Optional<FolderEntryDTO> folderEntryDTO = folderEntryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(folderEntryDTO);
    }

    /**
     * {@code DELETE  /folder-entries/:id} : delete the "id" folderEntry.
     *
     * @param id the id of the folderEntryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/folder-entries/{id}")
    public ResponseEntity<Void> deleteFolderEntry(@PathVariable Long id) {
        log.debug("REST request to delete FolderEntry : {}", id);
        folderEntryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
