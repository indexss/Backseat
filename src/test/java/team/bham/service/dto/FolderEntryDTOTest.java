package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class FolderEntryDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FolderEntryDTO.class);
        FolderEntryDTO folderEntryDTO1 = new FolderEntryDTO();
        folderEntryDTO1.setId(1L);
        FolderEntryDTO folderEntryDTO2 = new FolderEntryDTO();
        assertThat(folderEntryDTO1).isNotEqualTo(folderEntryDTO2);
        folderEntryDTO2.setId(folderEntryDTO1.getId());
        assertThat(folderEntryDTO1).isEqualTo(folderEntryDTO2);
        folderEntryDTO2.setId(2L);
        assertThat(folderEntryDTO1).isNotEqualTo(folderEntryDTO2);
        folderEntryDTO1.setId(null);
        assertThat(folderEntryDTO1).isNotEqualTo(folderEntryDTO2);
    }
}
