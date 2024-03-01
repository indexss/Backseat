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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import team.bham.repository.ArtistRepository;
import team.bham.service.ArtistService;
import team.bham.service.dto.ArtistDTO;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.Artist}.
 */
@RestController
@RequestMapping("/api")
public class ArtistResource {

    private final Logger log = LoggerFactory.getLogger(ArtistResource.class);

    private static final String ENTITY_NAME = "artist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArtistService artistService;

    private final ArtistRepository artistRepository;

    public ArtistResource(ArtistService artistService, ArtistRepository artistRepository) {
        this.artistService = artistService;
        this.artistRepository = artistRepository;
    }

    /**
     * {@code POST  /artists} : Create a new artist.
     *
     * @param artistDTO the artistDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new artistDTO, or with status {@code 400 (Bad Request)} if the artist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/artists")
    public ResponseEntity<ArtistDTO> createArtist(@Valid @RequestBody ArtistDTO artistDTO) throws URISyntaxException {
        log.debug("REST request to save Artist : {}", artistDTO);
        if (artistDTO.getSpotifyURI() != null) {
            throw new BadRequestAlertException("A new artist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArtistDTO result = artistService.save(artistDTO);
        return ResponseEntity
            .created(new URI("/api/artists/" + result.getSpotifyURI()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getSpotifyURI()))
            .body(result);
    }

    /**
     * {@code PUT  /artists/:spotifyURI} : Updates an existing artist.
     *
     * @param spotifyURI the id of the artistDTO to save.
     * @param artistDTO the artistDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated artistDTO,
     * or with status {@code 400 (Bad Request)} if the artistDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the artistDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/artists/{spotifyURI}")
    public ResponseEntity<ArtistDTO> updateArtist(
        @PathVariable(value = "spotifyURI", required = false) final String spotifyURI,
        @Valid @RequestBody ArtistDTO artistDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Artist : {}, {}", spotifyURI, artistDTO);
        if (artistDTO.getSpotifyURI() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(spotifyURI, artistDTO.getSpotifyURI())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!artistRepository.existsById(spotifyURI)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ArtistDTO result = artistService.update(artistDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, artistDTO.getSpotifyURI()))
            .body(result);
    }

    /**
     * {@code PATCH  /artists/:spotifyURI} : Partial updates given fields of an existing artist, field will ignore if it is null
     *
     * @param spotifyURI the id of the artistDTO to save.
     * @param artistDTO the artistDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated artistDTO,
     * or with status {@code 400 (Bad Request)} if the artistDTO is not valid,
     * or with status {@code 404 (Not Found)} if the artistDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the artistDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/artists/{spotifyURI}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ArtistDTO> partialUpdateArtist(
        @PathVariable(value = "spotifyURI", required = false) final String spotifyURI,
        @NotNull @RequestBody ArtistDTO artistDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Artist partially : {}, {}", spotifyURI, artistDTO);
        if (artistDTO.getSpotifyURI() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(spotifyURI, artistDTO.getSpotifyURI())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!artistRepository.existsById(spotifyURI)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ArtistDTO> result = artistService.partialUpdate(artistDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, artistDTO.getSpotifyURI())
        );
    }

    /**
     * {@code GET  /artists} : get all the artists.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of artists in body.
     */
    @GetMapping("/artists")
    public ResponseEntity<List<ArtistDTO>> getAllArtists(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Artists");
        Page<ArtistDTO> page = artistService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /artists/:id} : get the "id" artist.
     *
     * @param id the id of the artistDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the artistDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/artists/{id}")
    public ResponseEntity<ArtistDTO> getArtist(@PathVariable String id) {
        log.debug("REST request to get Artist : {}", id);
        Optional<ArtistDTO> artistDTO = artistService.findOne(id);
        return ResponseUtil.wrapOrNotFound(artistDTO);
    }

    /**
     * {@code DELETE  /artists/:id} : delete the "id" artist.
     *
     * @param id the id of the artistDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/artists/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable String id) {
        log.debug("REST request to delete Artist : {}", id);
        artistService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
