package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class WantToListenListEntryDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WantToListenListEntryDTO.class);
        WantToListenListEntryDTO wantToListenListEntryDTO1 = new WantToListenListEntryDTO();
        wantToListenListEntryDTO1.setId(1L);
        WantToListenListEntryDTO wantToListenListEntryDTO2 = new WantToListenListEntryDTO();
        assertThat(wantToListenListEntryDTO1).isNotEqualTo(wantToListenListEntryDTO2);
        wantToListenListEntryDTO2.setId(wantToListenListEntryDTO1.getId());
        assertThat(wantToListenListEntryDTO1).isEqualTo(wantToListenListEntryDTO2);
        wantToListenListEntryDTO2.setId(2L);
        assertThat(wantToListenListEntryDTO1).isNotEqualTo(wantToListenListEntryDTO2);
        wantToListenListEntryDTO1.setId(null);
        assertThat(wantToListenListEntryDTO1).isNotEqualTo(wantToListenListEntryDTO2);
    }
}
