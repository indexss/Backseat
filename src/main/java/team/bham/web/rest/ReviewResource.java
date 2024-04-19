package team.bham.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ArtistRepository;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.AlbumService;
import team.bham.service.ArtistService;
import team.bham.service.ReviewService;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ReviewDTO;
import team.bham.service.mapper.ReviewMapper;
import team.bham.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link team.bham.domain.Review}.
 */
@RestController
@RequestMapping("/api")
public class ReviewResource {

    private final Logger log = LoggerFactory.getLogger(ReviewResource.class);

    private static final String ENTITY_NAME = "review";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReviewService reviewService;

    private final ReviewRepository reviewRepository;
    private final TrackRepository trackRepository;
    private final ArtistRepository artistRepository;

    public ReviewResource(ReviewService reviewService, ReviewRepository reviewRepository, TrackRepository trackRepository, ArtistRepository artistRepository) {
        this.reviewService = reviewService;
        this.reviewRepository = reviewRepository;
        this.trackRepository = trackRepository;
        this.artistRepository = artistRepository;
    }

    /**
     * {@code POST  /reviews} : Create a new review.
     *
     * @param reviewDTO the reviewDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reviewDTO, or with status {@code 400 (Bad Request)} if the review has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reviews")
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody ReviewDTO reviewDTO) throws URISyntaxException {
        log.debug("REST request to save Review : {}", reviewDTO);
        if (reviewDTO.getId() != null) {
            throw new BadRequestAlertException("A new review cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReviewDTO result = reviewService.save(reviewDTO);
        return ResponseEntity
            .created(new URI("/api/reviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reviews/:id} : Updates an existing review.
     *
     * @param id the id of the reviewDTO to save.
     * @param reviewDTO the reviewDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reviewDTO,
     * or with status {@code 400 (Bad Request)} if the reviewDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reviewDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reviews/{id}")
    public ResponseEntity<ReviewDTO> updateReview(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ReviewDTO reviewDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Review : {}, {}", id, reviewDTO);
        if (reviewDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reviewDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reviewRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReviewDTO result = reviewService.update(reviewDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reviewDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /reviews/:id} : Partial updates given fields of an existing review, field will ignore if it is null
     *
     * @param id the id of the reviewDTO to save.
     * @param reviewDTO the reviewDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reviewDTO,
     * or with status {@code 400 (Bad Request)} if the reviewDTO is not valid,
     * or with status {@code 404 (Not Found)} if the reviewDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the reviewDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/reviews/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ReviewDTO> partialUpdateReview(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ReviewDTO reviewDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Review partially : {}, {}", id, reviewDTO);
        if (reviewDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reviewDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reviewRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReviewDTO> result = reviewService.partialUpdate(reviewDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reviewDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /reviews} : get all the reviews.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reviews in body.
     */
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDTO>> getAllReviews(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Reviews");
        Page<ReviewDTO> page = reviewService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    public static class ExtendedReview {
        public Review review;
        public List<String> artists;
    }

    @GetMapping("/reviews/byProfile/{id}")
    public List<ExtendedReview> getAllMyReviews(@PathVariable Long id) {
        log.debug("REST request to get a all my Reviews");
        List<Review> page = reviewRepository.findAll();
        List<ExtendedReview> res = new ArrayList<>();

        for (Review r: page) {
            if (id.equals(r.getProfile().getId())) {
                ExtendedReview er = new ExtendedReview();
                er.review = r;

                List<Artist> aex = null;

                if (r.getTrack() != null) {
                    aex = this.artistRepository.findByTracks_SpotifyURI(r.getTrack().getSpotifyURI());
                } else if (r.getAlbum() != null) {
                    aex = this.artistRepository.findByAlbums_SpotifyURI(r.getAlbum().getSpotifyURI());
                }

                if (aex != null) {
                    er.artists = aex.stream().map(Artist::getName).collect(Collectors.toList());
                }

                res.add(er);
            }
        }

        return res;
    }

    /**
     * {@code GET  /reviews/:id} : get the "id" review.
     *
     * @param id the id of the reviewDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reviewDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reviews/{id}")
    public ResponseEntity<ReviewDTO> getReview(@PathVariable Long id) {
        log.debug("REST request to get Review : {}", id);
        Optional<ReviewDTO> reviewDTO = reviewService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reviewDTO);
    }

    /**
     * {@code DELETE  /reviews/:id} : delete the "id" review.
     *
     * @param id the id of the reviewDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        log.debug("REST request to delete Review : {}", id);
        reviewService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
