package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class SpotifyConnectionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpotifyConnectionDTO.class);
        SpotifyConnectionDTO spotifyConnectionDTO1 = new SpotifyConnectionDTO();
        spotifyConnectionDTO1.setSpotifyURI("id1");
        SpotifyConnectionDTO spotifyConnectionDTO2 = new SpotifyConnectionDTO();
        assertThat(spotifyConnectionDTO1).isNotEqualTo(spotifyConnectionDTO2);
        spotifyConnectionDTO2.setSpotifyURI(spotifyConnectionDTO1.getSpotifyURI());
        assertThat(spotifyConnectionDTO1).isEqualTo(spotifyConnectionDTO2);
        spotifyConnectionDTO2.setSpotifyURI("id2");
        assertThat(spotifyConnectionDTO1).isNotEqualTo(spotifyConnectionDTO2);
        spotifyConnectionDTO1.setSpotifyURI(null);
        assertThat(spotifyConnectionDTO1).isNotEqualTo(spotifyConnectionDTO2);
    }
}
