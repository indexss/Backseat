package team.bham.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
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
import team.bham.domain.SpotifyConnection;
import team.bham.repository.SpotifyConnectionRepository;
import team.bham.service.dto.SpotifyConnectionDTO;
import team.bham.service.mapper.SpotifyConnectionMapper;

/**
 * Integration tests for the {@link SpotifyConnectionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SpotifyConnectionResourceIT {

    private static final String DEFAULT_REFRESH_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_REFRESH_TOKEN = "BBBBBBBBBB";

    private static final String DEFAULT_ACCESS_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_ACCESS_TOKEN = "BBBBBBBBBB";

    private static final Instant DEFAULT_ACCESS_TOKEN_EXPIRES_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACCESS_TOKEN_EXPIRES_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/spotify-connections";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{spotifyURI}";

    @Autowired
    private SpotifyConnectionRepository spotifyConnectionRepository;

    @Autowired
    private SpotifyConnectionMapper spotifyConnectionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSpotifyConnectionMockMvc;

    private SpotifyConnection spotifyConnection;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpotifyConnection createEntity(EntityManager em) {
        SpotifyConnection spotifyConnection = new SpotifyConnection()
            .refreshToken(DEFAULT_REFRESH_TOKEN)
            .accessToken(DEFAULT_ACCESS_TOKEN)
            .accessTokenExpiresAt(DEFAULT_ACCESS_TOKEN_EXPIRES_AT);
        return spotifyConnection;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpotifyConnection createUpdatedEntity(EntityManager em) {
        SpotifyConnection spotifyConnection = new SpotifyConnection()
            .refreshToken(UPDATED_REFRESH_TOKEN)
            .accessToken(UPDATED_ACCESS_TOKEN)
            .accessTokenExpiresAt(UPDATED_ACCESS_TOKEN_EXPIRES_AT);
        return spotifyConnection;
    }

    @BeforeEach
    public void initTest() {
        spotifyConnection = createEntity(em);
    }

    @Test
    @Transactional
    void createSpotifyConnection() throws Exception {
        int databaseSizeBeforeCreate = spotifyConnectionRepository.findAll().size();
        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);
        restSpotifyConnectionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isCreated());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeCreate + 1);
        SpotifyConnection testSpotifyConnection = spotifyConnectionList.get(spotifyConnectionList.size() - 1);
        assertThat(testSpotifyConnection.getRefreshToken()).isEqualTo(DEFAULT_REFRESH_TOKEN);
        assertThat(testSpotifyConnection.getAccessToken()).isEqualTo(DEFAULT_ACCESS_TOKEN);
        assertThat(testSpotifyConnection.getAccessTokenExpiresAt()).isEqualTo(DEFAULT_ACCESS_TOKEN_EXPIRES_AT);
    }

    @Test
    @Transactional
    void createSpotifyConnectionWithExistingId() throws Exception {
        // Create the SpotifyConnection with an existing ID
        spotifyConnection.setSpotifyURI("existing_id");
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        int databaseSizeBeforeCreate = spotifyConnectionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpotifyConnectionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAccessTokenIsRequired() throws Exception {
        int databaseSizeBeforeTest = spotifyConnectionRepository.findAll().size();
        // set the field null
        spotifyConnection.setAccessToken(null);

        // Create the SpotifyConnection, which fails.
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        restSpotifyConnectionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAccessTokenExpiresAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = spotifyConnectionRepository.findAll().size();
        // set the field null
        spotifyConnection.setAccessTokenExpiresAt(null);

        // Create the SpotifyConnection, which fails.
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        restSpotifyConnectionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllSpotifyConnections() throws Exception {
        // Initialize the database
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());
        spotifyConnectionRepository.saveAndFlush(spotifyConnection);

        // Get all the spotifyConnectionList
        restSpotifyConnectionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=spotifyURI,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].spotifyURI").value(hasItem(spotifyConnection.getSpotifyURI())))
            .andExpect(jsonPath("$.[*].refreshToken").value(hasItem(DEFAULT_REFRESH_TOKEN)))
            .andExpect(jsonPath("$.[*].accessToken").value(hasItem(DEFAULT_ACCESS_TOKEN)))
            .andExpect(jsonPath("$.[*].accessTokenExpiresAt").value(hasItem(DEFAULT_ACCESS_TOKEN_EXPIRES_AT.toString())));
    }

    @Test
    @Transactional
    void getSpotifyConnection() throws Exception {
        // Initialize the database
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());
        spotifyConnectionRepository.saveAndFlush(spotifyConnection);

        // Get the spotifyConnection
        restSpotifyConnectionMockMvc
            .perform(get(ENTITY_API_URL_ID, spotifyConnection.getSpotifyURI()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.spotifyURI").value(spotifyConnection.getSpotifyURI()))
            .andExpect(jsonPath("$.refreshToken").value(DEFAULT_REFRESH_TOKEN))
            .andExpect(jsonPath("$.accessToken").value(DEFAULT_ACCESS_TOKEN))
            .andExpect(jsonPath("$.accessTokenExpiresAt").value(DEFAULT_ACCESS_TOKEN_EXPIRES_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingSpotifyConnection() throws Exception {
        // Get the spotifyConnection
        restSpotifyConnectionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSpotifyConnection() throws Exception {
        // Initialize the database
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());
        spotifyConnectionRepository.saveAndFlush(spotifyConnection);

        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();

        // Update the spotifyConnection
        SpotifyConnection updatedSpotifyConnection = spotifyConnectionRepository.findById(spotifyConnection.getSpotifyURI()).get();
        // Disconnect from session so that the updates on updatedSpotifyConnection are not directly saved in db
        em.detach(updatedSpotifyConnection);
        updatedSpotifyConnection
            .refreshToken(UPDATED_REFRESH_TOKEN)
            .accessToken(UPDATED_ACCESS_TOKEN)
            .accessTokenExpiresAt(UPDATED_ACCESS_TOKEN_EXPIRES_AT);
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(updatedSpotifyConnection);

        restSpotifyConnectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, spotifyConnectionDTO.getSpotifyURI())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isOk());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
        SpotifyConnection testSpotifyConnection = spotifyConnectionList.get(spotifyConnectionList.size() - 1);
        assertThat(testSpotifyConnection.getRefreshToken()).isEqualTo(UPDATED_REFRESH_TOKEN);
        assertThat(testSpotifyConnection.getAccessToken()).isEqualTo(UPDATED_ACCESS_TOKEN);
        assertThat(testSpotifyConnection.getAccessTokenExpiresAt()).isEqualTo(UPDATED_ACCESS_TOKEN_EXPIRES_AT);
    }

    @Test
    @Transactional
    void putNonExistingSpotifyConnection() throws Exception {
        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());

        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpotifyConnectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, spotifyConnectionDTO.getSpotifyURI())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSpotifyConnection() throws Exception {
        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());

        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpotifyConnectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSpotifyConnection() throws Exception {
        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());

        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpotifyConnectionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSpotifyConnectionWithPatch() throws Exception {
        // Initialize the database
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());
        spotifyConnectionRepository.saveAndFlush(spotifyConnection);

        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();

        // Update the spotifyConnection using partial update
        SpotifyConnection partialUpdatedSpotifyConnection = new SpotifyConnection();
        partialUpdatedSpotifyConnection.setSpotifyURI(spotifyConnection.getSpotifyURI());

        partialUpdatedSpotifyConnection.accessTokenExpiresAt(UPDATED_ACCESS_TOKEN_EXPIRES_AT);

        restSpotifyConnectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSpotifyConnection.getSpotifyURI())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSpotifyConnection))
            )
            .andExpect(status().isOk());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
        SpotifyConnection testSpotifyConnection = spotifyConnectionList.get(spotifyConnectionList.size() - 1);
        assertThat(testSpotifyConnection.getRefreshToken()).isEqualTo(DEFAULT_REFRESH_TOKEN);
        assertThat(testSpotifyConnection.getAccessToken()).isEqualTo(DEFAULT_ACCESS_TOKEN);
        assertThat(testSpotifyConnection.getAccessTokenExpiresAt()).isEqualTo(UPDATED_ACCESS_TOKEN_EXPIRES_AT);
    }

    @Test
    @Transactional
    void fullUpdateSpotifyConnectionWithPatch() throws Exception {
        // Initialize the database
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());
        spotifyConnectionRepository.saveAndFlush(spotifyConnection);

        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();

        // Update the spotifyConnection using partial update
        SpotifyConnection partialUpdatedSpotifyConnection = new SpotifyConnection();
        partialUpdatedSpotifyConnection.setSpotifyURI(spotifyConnection.getSpotifyURI());

        partialUpdatedSpotifyConnection
            .refreshToken(UPDATED_REFRESH_TOKEN)
            .accessToken(UPDATED_ACCESS_TOKEN)
            .accessTokenExpiresAt(UPDATED_ACCESS_TOKEN_EXPIRES_AT);

        restSpotifyConnectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSpotifyConnection.getSpotifyURI())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSpotifyConnection))
            )
            .andExpect(status().isOk());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
        SpotifyConnection testSpotifyConnection = spotifyConnectionList.get(spotifyConnectionList.size() - 1);
        assertThat(testSpotifyConnection.getRefreshToken()).isEqualTo(UPDATED_REFRESH_TOKEN);
        assertThat(testSpotifyConnection.getAccessToken()).isEqualTo(UPDATED_ACCESS_TOKEN);
        assertThat(testSpotifyConnection.getAccessTokenExpiresAt()).isEqualTo(UPDATED_ACCESS_TOKEN_EXPIRES_AT);
    }

    @Test
    @Transactional
    void patchNonExistingSpotifyConnection() throws Exception {
        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());

        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpotifyConnectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, spotifyConnectionDTO.getSpotifyURI())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSpotifyConnection() throws Exception {
        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());

        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpotifyConnectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSpotifyConnection() throws Exception {
        int databaseSizeBeforeUpdate = spotifyConnectionRepository.findAll().size();
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());

        // Create the SpotifyConnection
        SpotifyConnectionDTO spotifyConnectionDTO = spotifyConnectionMapper.toDto(spotifyConnection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpotifyConnectionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(spotifyConnectionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SpotifyConnection in the database
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSpotifyConnection() throws Exception {
        // Initialize the database
        spotifyConnection.setSpotifyURI(UUID.randomUUID().toString());
        spotifyConnectionRepository.saveAndFlush(spotifyConnection);

        int databaseSizeBeforeDelete = spotifyConnectionRepository.findAll().size();

        // Delete the spotifyConnection
        restSpotifyConnectionMockMvc
            .perform(delete(ENTITY_API_URL_ID, spotifyConnection.getSpotifyURI()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SpotifyConnection> spotifyConnectionList = spotifyConnectionRepository.findAll();
        assertThat(spotifyConnectionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
