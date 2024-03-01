package team.bham.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team.bham.repository.SpotifyConnectionRepository;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.dto.SpotifyConnectionDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.SpotifyConnection}.
 */
@RestController
@RequestMapping("/api")
public class SpotifyConnectionResource {

    private final Logger log = LoggerFactory.getLogger(SpotifyConnectionResource.class);

    private static final String ENTITY_NAME = "spotifyConnection";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpotifyConnectionService spotifyConnectionService;

    private final SpotifyConnectionRepository spotifyConnectionRepository;

    public SpotifyConnectionResource(
        SpotifyConnectionService spotifyConnectionService,
        SpotifyConnectionRepository spotifyConnectionRepository
    ) {
        this.spotifyConnectionService = spotifyConnectionService;
        this.spotifyConnectionRepository = spotifyConnectionRepository;
    }

    /**
     * {@code POST  /spotify-connections} : Create a new spotifyConnection.
     *
     * @param spotifyConnectionDTO the spotifyConnectionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new spotifyConnectionDTO, or with status {@code 400 (Bad Request)} if the spotifyConnection has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/spotify-connections")
    public ResponseEntity<SpotifyConnectionDTO> createSpotifyConnection(@Valid @RequestBody SpotifyConnectionDTO spotifyConnectionDTO)
        throws URISyntaxException {
        log.debug("REST request to save SpotifyConnection : {}", spotifyConnectionDTO);
        if (spotifyConnectionDTO.getSpotifyURI() != null) {
            throw new BadRequestAlertException("A new spotifyConnection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpotifyConnectionDTO result = spotifyConnectionService.save(spotifyConnectionDTO);
        return ResponseEntity
            .created(new URI("/api/spotify-connections/" + result.getSpotifyURI()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getSpotifyURI()))
            .body(result);
    }

    /**
     * {@code PUT  /spotify-connections/:spotifyURI} : Updates an existing spotifyConnection.
     *
     * @param spotifyURI the id of the spotifyConnectionDTO to save.
     * @param spotifyConnectionDTO the spotifyConnectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated spotifyConnectionDTO,
     * or with status {@code 400 (Bad Request)} if the spotifyConnectionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the spotifyConnectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/spotify-connections/{spotifyURI}")
    public ResponseEntity<SpotifyConnectionDTO> updateSpotifyConnection(
        @PathVariable(value = "spotifyURI", required = false) final String spotifyURI,
        @Valid @RequestBody SpotifyConnectionDTO spotifyConnectionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update SpotifyConnection : {}, {}", spotifyURI, spotifyConnectionDTO);
        if (spotifyConnectionDTO.getSpotifyURI() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(spotifyURI, spotifyConnectionDTO.getSpotifyURI())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!spotifyConnectionRepository.existsById(spotifyURI)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SpotifyConnectionDTO result = spotifyConnectionService.update(spotifyConnectionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, spotifyConnectionDTO.getSpotifyURI()))
            .body(result);
    }

    /**
     * {@code PATCH  /spotify-connections/:spotifyURI} : Partial updates given fields of an existing spotifyConnection, field will ignore if it is null
     *
     * @param spotifyURI the id of the spotifyConnectionDTO to save.
     * @param spotifyConnectionDTO the spotifyConnectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated spotifyConnectionDTO,
     * or with status {@code 400 (Bad Request)} if the spotifyConnectionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the spotifyConnectionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the spotifyConnectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/spotify-connections/{spotifyURI}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SpotifyConnectionDTO> partialUpdateSpotifyConnection(
        @PathVariable(value = "spotifyURI", required = false) final String spotifyURI,
        @NotNull @RequestBody SpotifyConnectionDTO spotifyConnectionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update SpotifyConnection partially : {}, {}", spotifyURI, spotifyConnectionDTO);
        if (spotifyConnectionDTO.getSpotifyURI() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(spotifyURI, spotifyConnectionDTO.getSpotifyURI())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!spotifyConnectionRepository.existsById(spotifyURI)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SpotifyConnectionDTO> result = spotifyConnectionService.partialUpdate(spotifyConnectionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, spotifyConnectionDTO.getSpotifyURI())
        );
    }

    /**
     * {@code GET  /spotify-connections} : get all the spotifyConnections.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of spotifyConnections in body.
     */
    @GetMapping("/spotify-connections")
    public List<SpotifyConnectionDTO> getAllSpotifyConnections(@RequestParam(required = false) String filter) {
        if ("profile-is-null".equals(filter)) {
            log.debug("REST request to get all SpotifyConnections where profile is null");
            return spotifyConnectionService.findAllWhereProfileIsNull();
        }
        log.debug("REST request to get all SpotifyConnections");
        return spotifyConnectionService.findAll();
    }

    /**
     * {@code GET  /spotify-connections/:id} : get the "id" spotifyConnection.
     *
     * @param id the id of the spotifyConnectionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the spotifyConnectionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/spotify-connections/{id}")
    public ResponseEntity<SpotifyConnectionDTO> getSpotifyConnection(@PathVariable String id) {
        log.debug("REST request to get SpotifyConnection : {}", id);
        Optional<SpotifyConnectionDTO> spotifyConnectionDTO = spotifyConnectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(spotifyConnectionDTO);
    }

    /**
     * {@code DELETE  /spotify-connections/:id} : delete the "id" spotifyConnection.
     *
     * @param id the id of the spotifyConnectionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/spotify-connections/{id}")
    public ResponseEntity<Void> deleteSpotifyConnection(@PathVariable String id) {
        log.debug("REST request to delete SpotifyConnection : {}", id);
        spotifyConnectionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
