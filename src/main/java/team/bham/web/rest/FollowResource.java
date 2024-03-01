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
import team.bham.repository.FollowRepository;
import team.bham.service.FollowService;
import team.bham.service.dto.FollowDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.Follow}.
 */
@RestController
@RequestMapping("/api")
public class FollowResource {

    private final Logger log = LoggerFactory.getLogger(FollowResource.class);

    private static final String ENTITY_NAME = "follow";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FollowService followService;

    private final FollowRepository followRepository;

    public FollowResource(FollowService followService, FollowRepository followRepository) {
        this.followService = followService;
        this.followRepository = followRepository;
    }

    /**
     * {@code POST  /follows} : Create a new follow.
     *
     * @param followDTO the followDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new followDTO, or with status {@code 400 (Bad Request)} if the follow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/follows")
    public ResponseEntity<FollowDTO> createFollow(@Valid @RequestBody FollowDTO followDTO) throws URISyntaxException {
        log.debug("REST request to save Follow : {}", followDTO);
        if (followDTO.getId() != null) {
            throw new BadRequestAlertException("A new follow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FollowDTO result = followService.save(followDTO);
        return ResponseEntity
            .created(new URI("/api/follows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /follows/:id} : Updates an existing follow.
     *
     * @param id the id of the followDTO to save.
     * @param followDTO the followDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated followDTO,
     * or with status {@code 400 (Bad Request)} if the followDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the followDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/follows/{id}")
    public ResponseEntity<FollowDTO> updateFollow(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FollowDTO followDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Follow : {}, {}", id, followDTO);
        if (followDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, followDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!followRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FollowDTO result = followService.update(followDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, followDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /follows/:id} : Partial updates given fields of an existing follow, field will ignore if it is null
     *
     * @param id the id of the followDTO to save.
     * @param followDTO the followDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated followDTO,
     * or with status {@code 400 (Bad Request)} if the followDTO is not valid,
     * or with status {@code 404 (Not Found)} if the followDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the followDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/follows/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FollowDTO> partialUpdateFollow(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FollowDTO followDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Follow partially : {}, {}", id, followDTO);
        if (followDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, followDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!followRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FollowDTO> result = followService.partialUpdate(followDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, followDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /follows} : get all the follows.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of follows in body.
     */
    @GetMapping("/follows")
    public List<FollowDTO> getAllFollows() {
        log.debug("REST request to get all Follows");
        return followService.findAll();
    }

    /**
     * {@code GET  /follows/:id} : get the "id" follow.
     *
     * @param id the id of the followDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the followDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/follows/{id}")
    public ResponseEntity<FollowDTO> getFollow(@PathVariable Long id) {
        log.debug("REST request to get Follow : {}", id);
        Optional<FollowDTO> followDTO = followService.findOne(id);
        return ResponseUtil.wrapOrNotFound(followDTO);
    }

    /**
     * {@code DELETE  /follows/:id} : delete the "id" follow.
     *
     * @param id the id of the followDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/follows/{id}")
    public ResponseEntity<Void> deleteFollow(@PathVariable Long id) {
        log.debug("REST request to delete Follow : {}", id);
        followService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
