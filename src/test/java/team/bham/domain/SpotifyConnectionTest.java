package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class SpotifyConnectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpotifyConnection.class);
        SpotifyConnection spotifyConnection1 = new SpotifyConnection();
        spotifyConnection1.setId(1L);
        SpotifyConnection spotifyConnection2 = new SpotifyConnection();
        spotifyConnection2.setId(spotifyConnection1.getId());
        assertThat(spotifyConnection1).isEqualTo(spotifyConnection2);
        spotifyConnection2.setId(2L);
        assertThat(spotifyConnection1).isNotEqualTo(spotifyConnection2);
        spotifyConnection1.setId(null);
        assertThat(spotifyConnection1).isNotEqualTo(spotifyConnection2);
    }
}
