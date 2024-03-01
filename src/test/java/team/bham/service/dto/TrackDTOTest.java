package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class TrackDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrackDTO.class);
        TrackDTO trackDTO1 = new TrackDTO();
        trackDTO1.setSpotifyURI("id1");
        TrackDTO trackDTO2 = new TrackDTO();
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
        trackDTO2.setSpotifyURI(trackDTO1.getSpotifyURI());
        assertThat(trackDTO1).isEqualTo(trackDTO2);
        trackDTO2.setSpotifyURI("id2");
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
        trackDTO1.setSpotifyURI(null);
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
    }
}
