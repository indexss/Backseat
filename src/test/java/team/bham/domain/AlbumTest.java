package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class AlbumTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Album.class);
        Album album1 = new Album();
        album1.setSpotifyURI("id1");
        Album album2 = new Album();
        album2.setSpotifyURI(album1.getSpotifyURI());
        assertThat(album1).isEqualTo(album2);
        album2.setSpotifyURI("id2");
        assertThat(album1).isNotEqualTo(album2);
        album1.setSpotifyURI(null);
        assertThat(album1).isNotEqualTo(album2);
    }
}
