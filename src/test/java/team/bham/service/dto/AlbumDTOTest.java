package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class AlbumDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlbumDTO.class);
        AlbumDTO albumDTO1 = new AlbumDTO();
        albumDTO1.setSpotifyURI("id1");
        AlbumDTO albumDTO2 = new AlbumDTO();
        assertThat(albumDTO1).isNotEqualTo(albumDTO2);
        albumDTO2.setSpotifyURI(albumDTO1.getSpotifyURI());
        assertThat(albumDTO1).isEqualTo(albumDTO2);
        albumDTO2.setSpotifyURI("id2");
        assertThat(albumDTO1).isNotEqualTo(albumDTO2);
        albumDTO1.setSpotifyURI(null);
        assertThat(albumDTO1).isNotEqualTo(albumDTO2);
    }
}
