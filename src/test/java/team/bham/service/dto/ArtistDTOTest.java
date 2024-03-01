package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class ArtistDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArtistDTO.class);
        ArtistDTO artistDTO1 = new ArtistDTO();
        artistDTO1.setSpotifyURI("id1");
        ArtistDTO artistDTO2 = new ArtistDTO();
        assertThat(artistDTO1).isNotEqualTo(artistDTO2);
        artistDTO2.setSpotifyURI(artistDTO1.getSpotifyURI());
        assertThat(artistDTO1).isEqualTo(artistDTO2);
        artistDTO2.setSpotifyURI("id2");
        assertThat(artistDTO1).isNotEqualTo(artistDTO2);
        artistDTO1.setSpotifyURI(null);
        assertThat(artistDTO1).isNotEqualTo(artistDTO2);
    }
}
