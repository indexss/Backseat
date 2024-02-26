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
import team.bham.domain.FolderEntry;
import team.bham.repository.FolderEntryRepository;
import team.bham.service.dto.FolderEntryDTO;
import team.bham.service.mapper.FolderEntryMapper;

/**
 * Integration tests for the {@link FolderEntryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FolderEntryResourceIT {

    private static final String DEFAULT_FOLDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_FOLDER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SPOTIFY_URI = "AAAAAAAAAA";
    private static final String UPDATED_SPOTIFY_URI = "BBBBBBBBBB";

    private static final Instant DEFAULT_ADD_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ADD_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/folder-entries";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FolderEntryRepository folderEntryRepository;

    @Autowired
    private FolderEntryMapper folderEntryMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFolderEntryMockMvc;

    private FolderEntry folderEntry;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FolderEntry createEntity(EntityManager em) {
        FolderEntry folderEntry = new FolderEntry().folderID(DEFAULT_FOLDER_ID).spotifyURI(DEFAULT_SPOTIFY_URI).addTime(DEFAULT_ADD_TIME);
        return folderEntry;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FolderEntry createUpdatedEntity(EntityManager em) {
        FolderEntry folderEntry = new FolderEntry().folderID(UPDATED_FOLDER_ID).spotifyURI(UPDATED_SPOTIFY_URI).addTime(UPDATED_ADD_TIME);
        return folderEntry;
    }

    @BeforeEach
    public void initTest() {
        folderEntry = createEntity(em);
    }

    @Test
    @Transactional
    void createFolderEntry() throws Exception {
        int databaseSizeBeforeCreate = folderEntryRepository.findAll().size();
        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);
        restFolderEntryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isCreated());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeCreate + 1);
        FolderEntry testFolderEntry = folderEntryList.get(folderEntryList.size() - 1);
        assertThat(testFolderEntry.getFolderID()).isEqualTo(DEFAULT_FOLDER_ID);
        assertThat(testFolderEntry.getSpotifyURI()).isEqualTo(DEFAULT_SPOTIFY_URI);
        assertThat(testFolderEntry.getAddTime()).isEqualTo(DEFAULT_ADD_TIME);
    }

    @Test
    @Transactional
    void createFolderEntryWithExistingId() throws Exception {
        // Create the FolderEntry with an existing ID
        folderEntry.setId(1L);
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        int databaseSizeBeforeCreate = folderEntryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFolderEntryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFolderIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = folderEntryRepository.findAll().size();
        // set the field null
        folderEntry.setFolderID(null);

        // Create the FolderEntry, which fails.
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        restFolderEntryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSpotifyURIIsRequired() throws Exception {
        int databaseSizeBeforeTest = folderEntryRepository.findAll().size();
        // set the field null
        folderEntry.setSpotifyURI(null);

        // Create the FolderEntry, which fails.
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        restFolderEntryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAddTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = folderEntryRepository.findAll().size();
        // set the field null
        folderEntry.setAddTime(null);

        // Create the FolderEntry, which fails.
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        restFolderEntryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFolderEntries() throws Exception {
        // Initialize the database
        folderEntryRepository.saveAndFlush(folderEntry);

        // Get all the folderEntryList
        restFolderEntryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(folderEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].folderID").value(hasItem(DEFAULT_FOLDER_ID)))
            .andExpect(jsonPath("$.[*].spotifyURI").value(hasItem(DEFAULT_SPOTIFY_URI)))
            .andExpect(jsonPath("$.[*].addTime").value(hasItem(DEFAULT_ADD_TIME.toString())));
    }

    @Test
    @Transactional
    void getFolderEntry() throws Exception {
        // Initialize the database
        folderEntryRepository.saveAndFlush(folderEntry);

        // Get the folderEntry
        restFolderEntryMockMvc
            .perform(get(ENTITY_API_URL_ID, folderEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(folderEntry.getId().intValue()))
            .andExpect(jsonPath("$.folderID").value(DEFAULT_FOLDER_ID))
            .andExpect(jsonPath("$.spotifyURI").value(DEFAULT_SPOTIFY_URI))
            .andExpect(jsonPath("$.addTime").value(DEFAULT_ADD_TIME.toString()));
    }

    @Test
    @Transactional
    void getNonExistingFolderEntry() throws Exception {
        // Get the folderEntry
        restFolderEntryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFolderEntry() throws Exception {
        // Initialize the database
        folderEntryRepository.saveAndFlush(folderEntry);

        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();

        // Update the folderEntry
        FolderEntry updatedFolderEntry = folderEntryRepository.findById(folderEntry.getId()).get();
        // Disconnect from session so that the updates on updatedFolderEntry are not directly saved in db
        em.detach(updatedFolderEntry);
        updatedFolderEntry.folderID(UPDATED_FOLDER_ID).spotifyURI(UPDATED_SPOTIFY_URI).addTime(UPDATED_ADD_TIME);
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(updatedFolderEntry);

        restFolderEntryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, folderEntryDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isOk());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
        FolderEntry testFolderEntry = folderEntryList.get(folderEntryList.size() - 1);
        assertThat(testFolderEntry.getFolderID()).isEqualTo(UPDATED_FOLDER_ID);
        assertThat(testFolderEntry.getSpotifyURI()).isEqualTo(UPDATED_SPOTIFY_URI);
        assertThat(testFolderEntry.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
    }

    @Test
    @Transactional
    void putNonExistingFolderEntry() throws Exception {
        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();
        folderEntry.setId(count.incrementAndGet());

        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFolderEntryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, folderEntryDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFolderEntry() throws Exception {
        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();
        folderEntry.setId(count.incrementAndGet());

        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderEntryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFolderEntry() throws Exception {
        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();
        folderEntry.setId(count.incrementAndGet());

        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderEntryMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderEntryDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFolderEntryWithPatch() throws Exception {
        // Initialize the database
        folderEntryRepository.saveAndFlush(folderEntry);

        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();

        // Update the folderEntry using partial update
        FolderEntry partialUpdatedFolderEntry = new FolderEntry();
        partialUpdatedFolderEntry.setId(folderEntry.getId());

        partialUpdatedFolderEntry.spotifyURI(UPDATED_SPOTIFY_URI).addTime(UPDATED_ADD_TIME);

        restFolderEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFolderEntry.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFolderEntry))
            )
            .andExpect(status().isOk());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
        FolderEntry testFolderEntry = folderEntryList.get(folderEntryList.size() - 1);
        assertThat(testFolderEntry.getFolderID()).isEqualTo(DEFAULT_FOLDER_ID);
        assertThat(testFolderEntry.getSpotifyURI()).isEqualTo(UPDATED_SPOTIFY_URI);
        assertThat(testFolderEntry.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
    }

    @Test
    @Transactional
    void fullUpdateFolderEntryWithPatch() throws Exception {
        // Initialize the database
        folderEntryRepository.saveAndFlush(folderEntry);

        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();

        // Update the folderEntry using partial update
        FolderEntry partialUpdatedFolderEntry = new FolderEntry();
        partialUpdatedFolderEntry.setId(folderEntry.getId());

        partialUpdatedFolderEntry.folderID(UPDATED_FOLDER_ID).spotifyURI(UPDATED_SPOTIFY_URI).addTime(UPDATED_ADD_TIME);

        restFolderEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFolderEntry.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFolderEntry))
            )
            .andExpect(status().isOk());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
        FolderEntry testFolderEntry = folderEntryList.get(folderEntryList.size() - 1);
        assertThat(testFolderEntry.getFolderID()).isEqualTo(UPDATED_FOLDER_ID);
        assertThat(testFolderEntry.getSpotifyURI()).isEqualTo(UPDATED_SPOTIFY_URI);
        assertThat(testFolderEntry.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
    }

    @Test
    @Transactional
    void patchNonExistingFolderEntry() throws Exception {
        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();
        folderEntry.setId(count.incrementAndGet());

        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFolderEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, folderEntryDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFolderEntry() throws Exception {
        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();
        folderEntry.setId(count.incrementAndGet());

        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderEntryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFolderEntry() throws Exception {
        int databaseSizeBeforeUpdate = folderEntryRepository.findAll().size();
        folderEntry.setId(count.incrementAndGet());

        // Create the FolderEntry
        FolderEntryDTO folderEntryDTO = folderEntryMapper.toDto(folderEntry);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderEntryMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(folderEntryDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the FolderEntry in the database
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFolderEntry() throws Exception {
        // Initialize the database
        folderEntryRepository.saveAndFlush(folderEntry);

        int databaseSizeBeforeDelete = folderEntryRepository.findAll().size();

        // Delete the folderEntry
        restFolderEntryMockMvc
            .perform(delete(ENTITY_API_URL_ID, folderEntry.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FolderEntry> folderEntryList = folderEntryRepository.findAll();
        assertThat(folderEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
