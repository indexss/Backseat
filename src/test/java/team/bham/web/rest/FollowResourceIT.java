package team.bham.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
import team.bham.domain.Follow;
import team.bham.repository.FollowRepository;
import team.bham.service.dto.FollowDTO;
import team.bham.service.mapper.FollowMapper;

/**
 * Integration tests for the {@link FollowResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FollowResourceIT {

    private static final String DEFAULT_SOURCE_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TARGET_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_TARGET_USER_ID = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/follows";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private FollowMapper followMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFollowMockMvc;

    private Follow follow;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Follow createEntity(EntityManager em) {
        Follow follow = new Follow().sourceUserID(DEFAULT_SOURCE_USER_ID).targetUserID(DEFAULT_TARGET_USER_ID);
        return follow;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Follow createUpdatedEntity(EntityManager em) {
        Follow follow = new Follow().sourceUserID(UPDATED_SOURCE_USER_ID).targetUserID(UPDATED_TARGET_USER_ID);
        return follow;
    }

    @BeforeEach
    public void initTest() {
        follow = createEntity(em);
    }

    @Test
    @Transactional
    void createFollow() throws Exception {
        int databaseSizeBeforeCreate = followRepository.findAll().size();
        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);
        restFollowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(followDTO)))
            .andExpect(status().isCreated());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeCreate + 1);
        Follow testFollow = followList.get(followList.size() - 1);
        assertThat(testFollow.getSourceUserID()).isEqualTo(DEFAULT_SOURCE_USER_ID);
        assertThat(testFollow.getTargetUserID()).isEqualTo(DEFAULT_TARGET_USER_ID);
    }

    @Test
    @Transactional
    void createFollowWithExistingId() throws Exception {
        // Create the Follow with an existing ID
        follow.setId(1L);
        FollowDTO followDTO = followMapper.toDto(follow);

        int databaseSizeBeforeCreate = followRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFollowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(followDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSourceUserIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = followRepository.findAll().size();
        // set the field null
        follow.setSourceUserID(null);

        // Create the Follow, which fails.
        FollowDTO followDTO = followMapper.toDto(follow);

        restFollowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(followDTO)))
            .andExpect(status().isBadRequest());

        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTargetUserIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = followRepository.findAll().size();
        // set the field null
        follow.setTargetUserID(null);

        // Create the Follow, which fails.
        FollowDTO followDTO = followMapper.toDto(follow);

        restFollowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(followDTO)))
            .andExpect(status().isBadRequest());

        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFollows() throws Exception {
        // Initialize the database
        followRepository.saveAndFlush(follow);

        // Get all the followList
        restFollowMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(follow.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourceUserID").value(hasItem(DEFAULT_SOURCE_USER_ID)))
            .andExpect(jsonPath("$.[*].targetUserID").value(hasItem(DEFAULT_TARGET_USER_ID)));
    }

    @Test
    @Transactional
    void getFollow() throws Exception {
        // Initialize the database
        followRepository.saveAndFlush(follow);

        // Get the follow
        restFollowMockMvc
            .perform(get(ENTITY_API_URL_ID, follow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(follow.getId().intValue()))
            .andExpect(jsonPath("$.sourceUserID").value(DEFAULT_SOURCE_USER_ID))
            .andExpect(jsonPath("$.targetUserID").value(DEFAULT_TARGET_USER_ID));
    }

    @Test
    @Transactional
    void getNonExistingFollow() throws Exception {
        // Get the follow
        restFollowMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFollow() throws Exception {
        // Initialize the database
        followRepository.saveAndFlush(follow);

        int databaseSizeBeforeUpdate = followRepository.findAll().size();

        // Update the follow
        Follow updatedFollow = followRepository.findById(follow.getId()).get();
        // Disconnect from session so that the updates on updatedFollow are not directly saved in db
        em.detach(updatedFollow);
        updatedFollow.sourceUserID(UPDATED_SOURCE_USER_ID).targetUserID(UPDATED_TARGET_USER_ID);
        FollowDTO followDTO = followMapper.toDto(updatedFollow);

        restFollowMockMvc
            .perform(
                put(ENTITY_API_URL_ID, followDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(followDTO))
            )
            .andExpect(status().isOk());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
        Follow testFollow = followList.get(followList.size() - 1);
        assertThat(testFollow.getSourceUserID()).isEqualTo(UPDATED_SOURCE_USER_ID);
        assertThat(testFollow.getTargetUserID()).isEqualTo(UPDATED_TARGET_USER_ID);
    }

    @Test
    @Transactional
    void putNonExistingFollow() throws Exception {
        int databaseSizeBeforeUpdate = followRepository.findAll().size();
        follow.setId(count.incrementAndGet());

        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFollowMockMvc
            .perform(
                put(ENTITY_API_URL_ID, followDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(followDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFollow() throws Exception {
        int databaseSizeBeforeUpdate = followRepository.findAll().size();
        follow.setId(count.incrementAndGet());

        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFollowMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(followDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFollow() throws Exception {
        int databaseSizeBeforeUpdate = followRepository.findAll().size();
        follow.setId(count.incrementAndGet());

        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFollowMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(followDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFollowWithPatch() throws Exception {
        // Initialize the database
        followRepository.saveAndFlush(follow);

        int databaseSizeBeforeUpdate = followRepository.findAll().size();

        // Update the follow using partial update
        Follow partialUpdatedFollow = new Follow();
        partialUpdatedFollow.setId(follow.getId());

        partialUpdatedFollow.targetUserID(UPDATED_TARGET_USER_ID);

        restFollowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFollow.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFollow))
            )
            .andExpect(status().isOk());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
        Follow testFollow = followList.get(followList.size() - 1);
        assertThat(testFollow.getSourceUserID()).isEqualTo(DEFAULT_SOURCE_USER_ID);
        assertThat(testFollow.getTargetUserID()).isEqualTo(UPDATED_TARGET_USER_ID);
    }

    @Test
    @Transactional
    void fullUpdateFollowWithPatch() throws Exception {
        // Initialize the database
        followRepository.saveAndFlush(follow);

        int databaseSizeBeforeUpdate = followRepository.findAll().size();

        // Update the follow using partial update
        Follow partialUpdatedFollow = new Follow();
        partialUpdatedFollow.setId(follow.getId());

        partialUpdatedFollow.sourceUserID(UPDATED_SOURCE_USER_ID).targetUserID(UPDATED_TARGET_USER_ID);

        restFollowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFollow.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFollow))
            )
            .andExpect(status().isOk());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
        Follow testFollow = followList.get(followList.size() - 1);
        assertThat(testFollow.getSourceUserID()).isEqualTo(UPDATED_SOURCE_USER_ID);
        assertThat(testFollow.getTargetUserID()).isEqualTo(UPDATED_TARGET_USER_ID);
    }

    @Test
    @Transactional
    void patchNonExistingFollow() throws Exception {
        int databaseSizeBeforeUpdate = followRepository.findAll().size();
        follow.setId(count.incrementAndGet());

        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFollowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, followDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(followDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFollow() throws Exception {
        int databaseSizeBeforeUpdate = followRepository.findAll().size();
        follow.setId(count.incrementAndGet());

        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFollowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(followDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFollow() throws Exception {
        int databaseSizeBeforeUpdate = followRepository.findAll().size();
        follow.setId(count.incrementAndGet());

        // Create the Follow
        FollowDTO followDTO = followMapper.toDto(follow);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFollowMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(followDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Follow in the database
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFollow() throws Exception {
        // Initialize the database
        followRepository.saveAndFlush(follow);

        int databaseSizeBeforeDelete = followRepository.findAll().size();

        // Delete the follow
        restFollowMockMvc
            .perform(delete(ENTITY_API_URL_ID, follow.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Follow> followList = followRepository.findAll();
        assertThat(followList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
