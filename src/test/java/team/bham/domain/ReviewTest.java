package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class ReviewTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Review.class);
        Review review1 = new Review();
        review1.setId(1L);
        Review review2 = new Review();
        review2.setId(review1.getId());
        assertThat(review1).isEqualTo(review2);
        review2.setId(2L);
        assertThat(review1).isNotEqualTo(review2);
        review1.setId(null);
        assertThat(review1).isNotEqualTo(review2);
    }
}
