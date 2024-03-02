package team.bham.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import team.bham.IntegrationTest;
import team.bham.domain.Track;
import team.bham.repository.TrackRepository;
import team.bham.service.TrackService;
import team.bham.service.dto.TrackDTO;
import team.bham.service.mapper.TrackMapper;

/**
 * Integration tests for the {@link TrackResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class TrackResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_RELEASE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_RELEASE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_RATING = 1D;
    private static final Double UPDATED_RATING = 2D;

    private static final String ENTITY_API_URL = "/api/tracks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{spotifyURI}";

    @Autowired
    private TrackRepository trackRepository;

    @Mock
    private TrackRepository trackRepositoryMock;

    @Autowired
    private TrackMapper trackMapper;

    @Mock
    private TrackService trackServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrackMockMvc;

    private Track track;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Track createEntity(EntityManager em) {
        Track track = new Track()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .releaseDate(DEFAULT_RELEASE_DATE)
            .rating(DEFAULT_RATING);
        return track;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Track createUpdatedEntity(EntityManager em) {
        Track track = new Track()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .rating(UPDATED_RATING);
        return track;
    }

    @BeforeEach
    public void initTest() {
        track = createEntity(em);
    }

    @Test
    @Transactional
    void createTrack() throws Exception {
        int databaseSizeBeforeCreate = trackRepository.findAll().size();
        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);
        restTrackMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isCreated());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeCreate + 1);
        Track testTrack = trackList.get(trackList.size() - 1);
        assertThat(testTrack.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrack.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTrack.getReleaseDate()).isEqualTo(DEFAULT_RELEASE_DATE);
        assertThat(testTrack.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    void createTrackWithExistingId() throws Exception {
        // Create the Track with an existing ID
        track.setSpotifyURI("existing_id");
        TrackDTO trackDTO = trackMapper.toDto(track);

        int databaseSizeBeforeCreate = trackRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrackMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackRepository.findAll().size();
        // set the field null
        track.setName(null);

        // Create the Track, which fails.
        TrackDTO trackDTO = trackMapper.toDto(track);

        restTrackMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isBadRequest());

        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkReleaseDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackRepository.findAll().size();
        // set the field null
        track.setReleaseDate(null);

        // Create the Track, which fails.
        TrackDTO trackDTO = trackMapper.toDto(track);

        restTrackMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isBadRequest());

        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkRatingIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackRepository.findAll().size();
        // set the field null
        track.setRating(null);

        // Create the Track, which fails.
        TrackDTO trackDTO = trackMapper.toDto(track);

        restTrackMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isBadRequest());

        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTracks() throws Exception {
        // Initialize the database
        track.setSpotifyURI(UUID.randomUUID().toString());
        trackRepository.saveAndFlush(track);

        // Get all the trackList
        restTrackMockMvc
            .perform(get(ENTITY_API_URL + "?sort=spotifyURI,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].spotifyURI").value(hasItem(track.getSpotifyURI())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].releaseDate").value(hasItem(DEFAULT_RELEASE_DATE.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTracksWithEagerRelationshipsIsEnabled() throws Exception {
        when(trackServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrackMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(trackServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTracksWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(trackServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrackMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(trackRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getTrack() throws Exception {
        // Initialize the database
        track.setSpotifyURI(UUID.randomUUID().toString());
        trackRepository.saveAndFlush(track);

        // Get the track
        restTrackMockMvc
            .perform(get(ENTITY_API_URL_ID, track.getSpotifyURI()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.spotifyURI").value(track.getSpotifyURI()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.releaseDate").value(DEFAULT_RELEASE_DATE.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingTrack() throws Exception {
        // Get the track
        restTrackMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTrack() throws Exception {
        // Initialize the database
        track.setSpotifyURI(UUID.randomUUID().toString());
        trackRepository.saveAndFlush(track);

        int databaseSizeBeforeUpdate = trackRepository.findAll().size();

        // Update the track
        Track updatedTrack = trackRepository.findById(track.getSpotifyURI()).get();
        // Disconnect from session so that the updates on updatedTrack are not directly saved in db
        em.detach(updatedTrack);
        updatedTrack.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).releaseDate(UPDATED_RELEASE_DATE).rating(UPDATED_RATING);
        TrackDTO trackDTO = trackMapper.toDto(updatedTrack);

        restTrackMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trackDTO.getSpotifyURI())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trackDTO))
            )
            .andExpect(status().isOk());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
        Track testTrack = trackList.get(trackList.size() - 1);
        assertThat(testTrack.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrack.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTrack.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testTrack.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    void putNonExistingTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();
        track.setSpotifyURI(UUID.randomUUID().toString());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrackMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trackDTO.getSpotifyURI())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trackDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();
        track.setSpotifyURI(UUID.randomUUID().toString());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrackMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trackDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();
        track.setSpotifyURI(UUID.randomUUID().toString());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrackMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTrackWithPatch() throws Exception {
        // Initialize the database
        track.setSpotifyURI(UUID.randomUUID().toString());
        trackRepository.saveAndFlush(track);

        int databaseSizeBeforeUpdate = trackRepository.findAll().size();

        // Update the track using partial update
        Track partialUpdatedTrack = new Track();
        partialUpdatedTrack.setSpotifyURI(track.getSpotifyURI());

        partialUpdatedTrack.name(UPDATED_NAME).releaseDate(UPDATED_RELEASE_DATE).rating(UPDATED_RATING);

        restTrackMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrack.getSpotifyURI())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTrack))
            )
            .andExpect(status().isOk());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
        Track testTrack = trackList.get(trackList.size() - 1);
        assertThat(testTrack.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrack.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTrack.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testTrack.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    void fullUpdateTrackWithPatch() throws Exception {
        // Initialize the database
        track.setSpotifyURI(UUID.randomUUID().toString());
        trackRepository.saveAndFlush(track);

        int databaseSizeBeforeUpdate = trackRepository.findAll().size();

        // Update the track using partial update
        Track partialUpdatedTrack = new Track();
        partialUpdatedTrack.setSpotifyURI(track.getSpotifyURI());

        partialUpdatedTrack.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).releaseDate(UPDATED_RELEASE_DATE).rating(UPDATED_RATING);

        restTrackMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrack.getSpotifyURI())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTrack))
            )
            .andExpect(status().isOk());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
        Track testTrack = trackList.get(trackList.size() - 1);
        assertThat(testTrack.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrack.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTrack.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testTrack.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    void patchNonExistingTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();
        track.setSpotifyURI(UUID.randomUUID().toString());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrackMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, trackDTO.getSpotifyURI())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(trackDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();
        track.setSpotifyURI(UUID.randomUUID().toString());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrackMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(trackDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();
        track.setSpotifyURI(UUID.randomUUID().toString());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrackMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTrack() throws Exception {
        // Initialize the database
        track.setSpotifyURI(UUID.randomUUID().toString());
        trackRepository.saveAndFlush(track);

        int databaseSizeBeforeDelete = trackRepository.findAll().size();

        // Delete the track
        restTrackMockMvc
            .perform(delete(ENTITY_API_URL_ID, track.getSpotifyURI()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
