package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class FolderEntryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FolderEntry.class);
        FolderEntry folderEntry1 = new FolderEntry();
        folderEntry1.setId(1L);
        FolderEntry folderEntry2 = new FolderEntry();
        folderEntry2.setId(folderEntry1.getId());
        assertThat(folderEntry1).isEqualTo(folderEntry2);
        folderEntry2.setId(2L);
        assertThat(folderEntry1).isNotEqualTo(folderEntry2);
        folderEntry1.setId(null);
        assertThat(folderEntry1).isNotEqualTo(folderEntry2);
    }
}
