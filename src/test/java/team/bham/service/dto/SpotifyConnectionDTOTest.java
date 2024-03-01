package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class SpotifyConnectionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpotifyConnectionDTO.class);
        SpotifyConnectionDTO spotifyConnectionDTO1 = new SpotifyConnectionDTO();
        spotifyConnectionDTO1.setId(1L);
        SpotifyConnectionDTO spotifyConnectionDTO2 = new SpotifyConnectionDTO();
        assertThat(spotifyConnectionDTO1).isNotEqualTo(spotifyConnectionDTO2);
        spotifyConnectionDTO2.setId(spotifyConnectionDTO1.getId());
        assertThat(spotifyConnectionDTO1).isEqualTo(spotifyConnectionDTO2);
        spotifyConnectionDTO2.setId(2L);
        assertThat(spotifyConnectionDTO1).isNotEqualTo(spotifyConnectionDTO2);
        spotifyConnectionDTO1.setId(null);
        assertThat(spotifyConnectionDTO1).isNotEqualTo(spotifyConnectionDTO2);
    }
}
