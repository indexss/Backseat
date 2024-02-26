package team.bham.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class ReviewDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReviewDTO.class);
        ReviewDTO reviewDTO1 = new ReviewDTO();
        reviewDTO1.setId(1L);
        ReviewDTO reviewDTO2 = new ReviewDTO();
        assertThat(reviewDTO1).isNotEqualTo(reviewDTO2);
        reviewDTO2.setId(reviewDTO1.getId());
        assertThat(reviewDTO1).isEqualTo(reviewDTO2);
        reviewDTO2.setId(2L);
        assertThat(reviewDTO1).isNotEqualTo(reviewDTO2);
        reviewDTO1.setId(null);
        assertThat(reviewDTO1).isNotEqualTo(reviewDTO2);
    }
}
