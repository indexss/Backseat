package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class TrackTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Track.class);
        Track track1 = new Track();
        track1.setSpotifyURI("id1");
        Track track2 = new Track();
        track2.setSpotifyURI(track1.getSpotifyURI());
        assertThat(track1).isEqualTo(track2);
        track2.setSpotifyURI("id2");
        assertThat(track1).isNotEqualTo(track2);
        track1.setSpotifyURI(null);
        assertThat(track1).isNotEqualTo(track2);
    }
}
