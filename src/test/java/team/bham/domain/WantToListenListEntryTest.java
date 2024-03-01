package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class WantToListenListEntryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WantToListenListEntry.class);
        WantToListenListEntry wantToListenListEntry1 = new WantToListenListEntry();
        wantToListenListEntry1.setId(1L);
        WantToListenListEntry wantToListenListEntry2 = new WantToListenListEntry();
        wantToListenListEntry2.setId(wantToListenListEntry1.getId());
        assertThat(wantToListenListEntry1).isEqualTo(wantToListenListEntry2);
        wantToListenListEntry2.setId(2L);
        assertThat(wantToListenListEntry1).isNotEqualTo(wantToListenListEntry2);
        wantToListenListEntry1.setId(null);
        assertThat(wantToListenListEntry1).isNotEqualTo(wantToListenListEntry2);
    }
}
