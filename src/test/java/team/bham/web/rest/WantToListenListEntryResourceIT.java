package team.bham.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import team.bham.IntegrationTest;
import team.bham.domain.WantToListenListEntry;
import team.bham.repository.WantToListenListEntryRepository;
import team.bham.service.dto.WantToListenListEntryDTO;
import team.bham.service.mapper.WantToListenListEntryMapper;

/**
 * Integration tests for the {@link WantToListenListEntryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WantToListenListEntryResourceIT {

    private static final String DEFAULT_SPOTIFY_URI = "AAAAAAAAAA";
    private static final String UPDATED_SPOTIFY_URI = "BBBBBBBBBB";

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_ADD_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ADD_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/want-to-listen-list-entries";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private WantToListenListEntryRepository wantToListenListEntryRepository;

    @Autowired
    private WantToListenListEntryMapper wantToListenListEntryMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWantToListenListEntryMockMvc;

    private WantToListenListEntry wantToListenListEntry;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WantToListenListEntry createEntity(EntityManager em) {
        WantToListenListEntry wantToListenListEntry = new WantToListenListEntry()
            .spotifyURI(DEFAULT_SPOTIFY_URI)
            .userID(DEFAULT_USER_ID)
            .addTime(DEFAULT_ADD_TIME);
        return wantToListenListEntry;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WantToListenListEntry createUpdatedEntity(EntityManager em) {
        WantToListenListEntry wantToListenListEntry = new WantToListenListEntry()
            .spotifyURI(UPDATED_SPOTIFY_URI)
            .userID(UPDATED_USER_ID)
            .addTime(UPDATED_ADD_TIME);
        return wantToListenListEntry;
    }

    @BeforeEach
    public void initTest() {
        wantToListenListEntry = createEntity(em);
    }

    @Test
    @Transactional
    void createWantToListenListEntry() throws Exception {
        int databaseSizeBeforeCreate = wantToListenListEntryRepository.findAll().size();
        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);
        restWantToListenListEntryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeCreate + 1);
        WantToListenListEntry testWantToListenListEntry = wantToListenListEntryList.get(wantToListenListEntryList.size() - 1);
        assertThat(testWantToListenListEntry.getSpotifyURI()).isEqualTo(DEFAULT_SPOTIFY_URI);
        assertThat(testWantToListenListEntry.getUserID()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testWantToListenListEntry.getAddTime()).isEqualTo(DEFAULT_ADD_TIME);
    }

    @Test
    @Transactional
    void createWantToListenListEntryWithExistingId() throws Exception {
        // Create the WantToListenListEntry with an existing ID
        wantToListenListEntry.setId(1L);
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        int databaseSizeBeforeCreate = wantToListenListEntryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWantToListenListEntryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSpotifyURIIsRequired() throws Exception {
        int databaseSizeBeforeTest = wantToListenListEntryRepository.findAll().size();
        // set the field null
        wantToListenListEntry.setSpotifyURI(null);

        // Create the WantToListenListEntry, which fails.
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        restWantToListenListEntryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUserIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = wantToListenListEntryRepository.findAll().size();
        // set the field null
        wantToListenListEntry.setUserID(null);

        // Create the WantToListenListEntry, which fails.
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        restWantToListenListEntryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAddTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = wantToListenListEntryRepository.findAll().size();
        // set the field null
        wantToListenListEntry.setAddTime(null);

        // Create the WantToListenListEntry, which fails.
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        restWantToListenListEntryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllWantToListenListEntries() throws Exception {
        // Initialize the database
        wantToListenListEntryRepository.saveAndFlush(wantToListenListEntry);

        // Get all the wantToListenListEntryList
        restWantToListenListEntryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wantToListenListEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].spotifyURI").value(hasItem(DEFAULT_SPOTIFY_URI)))
            .andExpect(jsonPath("$.[*].userID").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].addTime").value(hasItem(DEFAULT_ADD_TIME.toString())));
    }

    @Test
    @Transactional
    void getWantToListenListEntry() throws Exception {
        // Initialize the database
        wantToListenListEntryRepository.saveAndFlush(wantToListenListEntry);

        // Get the wantToListenListEntry
        restWantToListenListEntryMockMvc
            .perform(get(ENTITY_API_URL_ID, wantToListenListEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(wantToListenListEntry.getId().intValue()))
            .andExpect(jsonPath("$.spotifyURI").value(DEFAULT_SPOTIFY_URI))
            .andExpect(jsonPath("$.userID").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.addTime").value(DEFAULT_ADD_TIME.toString()));
    }

    @Test
    @Transactional
    void getNonExistingWantToListenListEntry() throws Exception {
        // Get the wantToListenListEntry
        restWantToListenListEntryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWantToListenListEntry() throws Exception {
        // Initialize the database
        wantToListenListEntryRepository.saveAndFlush(wantToListenListEntry);

        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();

        // Update the wantToListenListEntry
        WantToListenListEntry updatedWantToListenListEntry = wantToListenListEntryRepository.findById(wantToListenListEntry.getId()).get();
        // Disconnect from session so that the updates on updatedWantToListenListEntry are not directly saved in db
        em.detach(updatedWantToListenListEntry);
        updatedWantToListenListEntry.spotifyURI(UPDATED_SPOTIFY_URI).userID(UPDATED_USER_ID).addTime(UPDATED_ADD_TIME);
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(updatedWantToListenListEntry);

        restWantToListenListEntryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, wantToListenListEntryDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isOk());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
        WantToListenListEntry testWantToListenListEntry = wantToListenListEntryList.get(wantToListenListEntryList.size() - 1);
        assertThat(testWantToListenListEntry.getSpotifyURI()).isEqualTo(UPDATED_SPOTIFY_URI);
        assertThat(testWantToListenListEntry.getUserID()).isEqualTo(UPDATED_USER_ID);
        assertThat(testWantToListenListEntry.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
    }

    @Test
    @Transactional
    void putNonExistingWantToListenListEntry() throws Exception {
        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();
        wantToListenListEntry.setId(count.incrementAndGet());

        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWantToListenListEntryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, wantToListenListEntryDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWantToListenListEntry() throws Exception {
        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();
        wantToListenListEntry.setId(count.incrementAndGet());

        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWantToListenListEntryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWantToListenListEntry() throws Exception {
        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();
        wantToListenListEntry.setId(count.incrementAndGet());

        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWantToListenListEntryMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWantToListenListEntryWithPatch() throws Exception {
        // Initialize the database
        wantToListenListEntryRepository.saveAndFlush(wantToListenListEntry);

        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();

        // Update the wantToListenListEntry using partial update
        WantToListenListEntry partialUpdatedWantToListenListEntry = new WantToListenListEntry();
        partialUpdatedWantToListenListEntry.setId(wantToListenListEntry.getId());

        partialUpdatedWantToListenListEntry.spotifyURI(UPDATED_SPOTIFY_URI).userID(UPDATED_USER_ID).addTime(UPDATED_ADD_TIME);

        restWantToListenListEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWantToListenListEntry.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWantToListenListEntry))
            )
            .andExpect(status().isOk());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
        WantToListenListEntry testWantToListenListEntry = wantToListenListEntryList.get(wantToListenListEntryList.size() - 1);
        assertThat(testWantToListenListEntry.getSpotifyURI()).isEqualTo(UPDATED_SPOTIFY_URI);
        assertThat(testWantToListenListEntry.getUserID()).isEqualTo(UPDATED_USER_ID);
        assertThat(testWantToListenListEntry.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
    }

    @Test
    @Transactional
    void fullUpdateWantToListenListEntryWithPatch() throws Exception {
        // Initialize the database
        wantToListenListEntryRepository.saveAndFlush(wantToListenListEntry);

        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();

        // Update the wantToListenListEntry using partial update
        WantToListenListEntry partialUpdatedWantToListenListEntry = new WantToListenListEntry();
        partialUpdatedWantToListenListEntry.setId(wantToListenListEntry.getId());

        partialUpdatedWantToListenListEntry.spotifyURI(UPDATED_SPOTIFY_URI).userID(UPDATED_USER_ID).addTime(UPDATED_ADD_TIME);

        restWantToListenListEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWantToListenListEntry.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWantToListenListEntry))
            )
            .andExpect(status().isOk());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
        WantToListenListEntry testWantToListenListEntry = wantToListenListEntryList.get(wantToListenListEntryList.size() - 1);
        assertThat(testWantToListenListEntry.getSpotifyURI()).isEqualTo(UPDATED_SPOTIFY_URI);
        assertThat(testWantToListenListEntry.getUserID()).isEqualTo(UPDATED_USER_ID);
        assertThat(testWantToListenListEntry.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
    }

    @Test
    @Transactional
    void patchNonExistingWantToListenListEntry() throws Exception {
        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();
        wantToListenListEntry.setId(count.incrementAndGet());

        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWantToListenListEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, wantToListenListEntryDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWantToListenListEntry() throws Exception {
        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();
        wantToListenListEntry.setId(count.incrementAndGet());

        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWantToListenListEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWantToListenListEntry() throws Exception {
        int databaseSizeBeforeUpdate = wantToListenListEntryRepository.findAll().size();
        wantToListenListEntry.setId(count.incrementAndGet());

        // Create the WantToListenListEntry
        WantToListenListEntryDTO wantToListenListEntryDTO = wantToListenListEntryMapper.toDto(wantToListenListEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWantToListenListEntryMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(wantToListenListEntryDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WantToListenListEntry in the database
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWantToListenListEntry() throws Exception {
        // Initialize the database
        wantToListenListEntryRepository.saveAndFlush(wantToListenListEntry);

        int databaseSizeBeforeDelete = wantToListenListEntryRepository.findAll().size();

        // Delete the wantToListenListEntry
        restWantToListenListEntryMockMvc
            .perform(delete(ENTITY_API_URL_ID, wantToListenListEntry.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WantToListenListEntry> wantToListenListEntryList = wantToListenListEntryRepository.findAll();
        assertThat(wantToListenListEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
