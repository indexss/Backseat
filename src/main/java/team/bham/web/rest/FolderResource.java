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
import team.bham.repository.FolderRepository;
import team.bham.service.FolderService;
import team.bham.service.dto.FolderDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.Folder}.
 */
@RestController
@RequestMapping("/api")
public class FolderResource {

    private final Logger log = LoggerFactory.getLogger(FolderResource.class);

    private static final String ENTITY_NAME = "folder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FolderService folderService;

    private final FolderRepository folderRepository;

    public FolderResource(FolderService folderService, FolderRepository folderRepository) {
        this.folderService = folderService;
        this.folderRepository = folderRepository;
    }

    /**
     * {@code POST  /folders} : Create a new folder.
     *
     * @param folderDTO the folderDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new folderDTO, or with status {@code 400 (Bad Request)} if the folder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/folders")
    public ResponseEntity<FolderDTO> createFolder(@Valid @RequestBody FolderDTO folderDTO) throws URISyntaxException {
        log.debug("REST request to save Folder : {}", folderDTO);
        if (folderDTO.getId() != null) {
            throw new BadRequestAlertException("A new folder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FolderDTO result = folderService.save(folderDTO);
        return ResponseEntity
            .created(new URI("/api/folders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /folders/:id} : Updates an existing folder.
     *
     * @param id the id of the folderDTO to save.
     * @param folderDTO the folderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated folderDTO,
     * or with status {@code 400 (Bad Request)} if the folderDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the folderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/folders/{id}")
    public ResponseEntity<FolderDTO> updateFolder(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FolderDTO folderDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Folder : {}, {}", id, folderDTO);
        if (folderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, folderDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!folderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FolderDTO result = folderService.update(folderDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, folderDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /folders/:id} : Partial updates given fields of an existing folder, field will ignore if it is null
     *
     * @param id the id of the folderDTO to save.
     * @param folderDTO the folderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated folderDTO,
     * or with status {@code 400 (Bad Request)} if the folderDTO is not valid,
     * or with status {@code 404 (Not Found)} if the folderDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the folderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/folders/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FolderDTO> partialUpdateFolder(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FolderDTO folderDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Folder partially : {}, {}", id, folderDTO);
        if (folderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, folderDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!folderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FolderDTO> result = folderService.partialUpdate(folderDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, folderDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /folders} : get all the folders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of folders in body.
     */
    @GetMapping("/folders")
    public List<FolderDTO> getAllFolders() {
        log.debug("REST request to get all Folders");
        return folderService.findAll();
    }

    /**
     * {@code GET  /folders/:id} : get the "id" folder.
     *
     * @param id the id of the folderDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the folderDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/folders/{id}")
    public ResponseEntity<FolderDTO> getFolder(@PathVariable Long id) {
        log.debug("REST request to get Folder : {}", id);
        Optional<FolderDTO> folderDTO = folderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(folderDTO);
    }

    /**
     * {@code DELETE  /folders/:id} : delete the "id" folder.
     *
     * @param id the id of the folderDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/folders/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long id) {
        log.debug("REST request to delete Folder : {}", id);
        folderService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
