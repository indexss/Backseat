package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class AlbumDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlbumDTO.class);
        AlbumDTO albumDTO1 = new AlbumDTO();
        albumDTO1.setId(1L);
        AlbumDTO albumDTO2 = new AlbumDTO();
        assertThat(albumDTO1).isNotEqualTo(albumDTO2);
        albumDTO2.setId(albumDTO1.getId());
        assertThat(albumDTO1).isEqualTo(albumDTO2);
        albumDTO2.setId(2L);
        assertThat(albumDTO1).isNotEqualTo(albumDTO2);
        albumDTO1.setId(null);
        assertThat(albumDTO1).isNotEqualTo(albumDTO2);
    }
}
