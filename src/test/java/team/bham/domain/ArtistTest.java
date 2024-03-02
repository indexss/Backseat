package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class ArtistTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Artist.class);
        Artist artist1 = new Artist();
        artist1.setSpotifyURI("id1");
        Artist artist2 = new Artist();
        artist2.setSpotifyURI(artist1.getSpotifyURI());
        assertThat(artist1).isEqualTo(artist2);
        artist2.setSpotifyURI("id2");
        assertThat(artist1).isNotEqualTo(artist2);
        artist1.setSpotifyURI(null);
        assertThat(artist1).isNotEqualTo(artist2);
    }
}
