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
import org.springframework.util.Base64Utils;
import team.bham.IntegrationTest;
import team.bham.domain.Folder;
import team.bham.repository.FolderRepository;
import team.bham.service.dto.FolderDTO;
import team.bham.service.mapper.FolderMapper;

/**
 * Integration tests for the {@link FolderResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FolderResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE_PATH = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE_PATH = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_PATH_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_PATH_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/folders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private FolderMapper folderMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFolderMockMvc;

    private Folder folder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Folder createEntity(EntityManager em) {
        Folder folder = new Folder().name(DEFAULT_NAME).imagePath(DEFAULT_IMAGE_PATH).imagePathContentType(DEFAULT_IMAGE_PATH_CONTENT_TYPE);
        return folder;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Folder createUpdatedEntity(EntityManager em) {
        Folder folder = new Folder().name(UPDATED_NAME).imagePath(UPDATED_IMAGE_PATH).imagePathContentType(UPDATED_IMAGE_PATH_CONTENT_TYPE);
        return folder;
    }

    @BeforeEach
    public void initTest() {
        folder = createEntity(em);
    }

    @Test
    @Transactional
    void createFolder() throws Exception {
        int databaseSizeBeforeCreate = folderRepository.findAll().size();
        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);
        restFolderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderDTO)))
            .andExpect(status().isCreated());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeCreate + 1);
        Folder testFolder = folderList.get(folderList.size() - 1);
        assertThat(testFolder.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFolder.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testFolder.getImagePathContentType()).isEqualTo(DEFAULT_IMAGE_PATH_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createFolderWithExistingId() throws Exception {
        // Create the Folder with an existing ID
        folder.setId(1L);
        FolderDTO folderDTO = folderMapper.toDto(folder);

        int databaseSizeBeforeCreate = folderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFolderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = folderRepository.findAll().size();
        // set the field null
        folder.setName(null);

        // Create the Folder, which fails.
        FolderDTO folderDTO = folderMapper.toDto(folder);

        restFolderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderDTO)))
            .andExpect(status().isBadRequest());

        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFolders() throws Exception {
        // Initialize the database
        folderRepository.saveAndFlush(folder);

        // Get all the folderList
        restFolderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(folder.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].imagePathContentType").value(hasItem(DEFAULT_IMAGE_PATH_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagePath").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE_PATH))));
    }

    @Test
    @Transactional
    void getFolder() throws Exception {
        // Initialize the database
        folderRepository.saveAndFlush(folder);

        // Get the folder
        restFolderMockMvc
            .perform(get(ENTITY_API_URL_ID, folder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(folder.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.imagePathContentType").value(DEFAULT_IMAGE_PATH_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagePath").value(Base64Utils.encodeToString(DEFAULT_IMAGE_PATH)));
    }

    @Test
    @Transactional
    void getNonExistingFolder() throws Exception {
        // Get the folder
        restFolderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFolder() throws Exception {
        // Initialize the database
        folderRepository.saveAndFlush(folder);

        int databaseSizeBeforeUpdate = folderRepository.findAll().size();

        // Update the folder
        Folder updatedFolder = folderRepository.findById(folder.getId()).get();
        // Disconnect from session so that the updates on updatedFolder are not directly saved in db
        em.detach(updatedFolder);
        updatedFolder.name(UPDATED_NAME).imagePath(UPDATED_IMAGE_PATH).imagePathContentType(UPDATED_IMAGE_PATH_CONTENT_TYPE);
        FolderDTO folderDTO = folderMapper.toDto(updatedFolder);

        restFolderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, folderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(folderDTO))
            )
            .andExpect(status().isOk());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
        Folder testFolder = folderList.get(folderList.size() - 1);
        assertThat(testFolder.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFolder.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testFolder.getImagePathContentType()).isEqualTo(UPDATED_IMAGE_PATH_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingFolder() throws Exception {
        int databaseSizeBeforeUpdate = folderRepository.findAll().size();
        folder.setId(count.incrementAndGet());

        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFolderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, folderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(folderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFolder() throws Exception {
        int databaseSizeBeforeUpdate = folderRepository.findAll().size();
        folder.setId(count.incrementAndGet());

        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(folderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFolder() throws Exception {
        int databaseSizeBeforeUpdate = folderRepository.findAll().size();
        folder.setId(count.incrementAndGet());

        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(folderDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFolderWithPatch() throws Exception {
        // Initialize the database
        folderRepository.saveAndFlush(folder);

        int databaseSizeBeforeUpdate = folderRepository.findAll().size();

        // Update the folder using partial update
        Folder partialUpdatedFolder = new Folder();
        partialUpdatedFolder.setId(folder.getId());

        partialUpdatedFolder.name(UPDATED_NAME);

        restFolderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFolder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFolder))
            )
            .andExpect(status().isOk());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
        Folder testFolder = folderList.get(folderList.size() - 1);
        assertThat(testFolder.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFolder.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testFolder.getImagePathContentType()).isEqualTo(DEFAULT_IMAGE_PATH_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateFolderWithPatch() throws Exception {
        // Initialize the database
        folderRepository.saveAndFlush(folder);

        int databaseSizeBeforeUpdate = folderRepository.findAll().size();

        // Update the folder using partial update
        Folder partialUpdatedFolder = new Folder();
        partialUpdatedFolder.setId(folder.getId());

        partialUpdatedFolder.name(UPDATED_NAME).imagePath(UPDATED_IMAGE_PATH).imagePathContentType(UPDATED_IMAGE_PATH_CONTENT_TYPE);

        restFolderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFolder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFolder))
            )
            .andExpect(status().isOk());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
        Folder testFolder = folderList.get(folderList.size() - 1);
        assertThat(testFolder.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFolder.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testFolder.getImagePathContentType()).isEqualTo(UPDATED_IMAGE_PATH_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingFolder() throws Exception {
        int databaseSizeBeforeUpdate = folderRepository.findAll().size();
        folder.setId(count.incrementAndGet());

        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFolderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, folderDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(folderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFolder() throws Exception {
        int databaseSizeBeforeUpdate = folderRepository.findAll().size();
        folder.setId(count.incrementAndGet());

        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(folderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFolder() throws Exception {
        int databaseSizeBeforeUpdate = folderRepository.findAll().size();
        folder.setId(count.incrementAndGet());

        // Create the Folder
        FolderDTO folderDTO = folderMapper.toDto(folder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFolderMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(folderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Folder in the database
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFolder() throws Exception {
        // Initialize the database
        folderRepository.saveAndFlush(folder);

        int databaseSizeBeforeDelete = folderRepository.findAll().size();

        // Delete the folder
        restFolderMockMvc
            .perform(delete(ENTITY_API_URL_ID, folder.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Folder> folderList = folderRepository.findAll();
        assertThat(folderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
