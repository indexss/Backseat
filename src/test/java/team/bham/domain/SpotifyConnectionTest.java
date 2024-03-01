package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class SpotifyConnectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpotifyConnection.class);
        SpotifyConnection spotifyConnection1 = new SpotifyConnection();
        spotifyConnection1.setSpotifyURI("id1");
        SpotifyConnection spotifyConnection2 = new SpotifyConnection();
        spotifyConnection2.setSpotifyURI(spotifyConnection1.getSpotifyURI());
        assertThat(spotifyConnection1).isEqualTo(spotifyConnection2);
        spotifyConnection2.setSpotifyURI("id2");
        assertThat(spotifyConnection1).isNotEqualTo(spotifyConnection2);
        spotifyConnection1.setSpotifyURI(null);
        assertThat(spotifyConnection1).isNotEqualTo(spotifyConnection2);
    }
}
