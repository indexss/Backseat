package team.bham.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import team.bham.web.rest.TestUtil;

class FollowTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Follow.class);
        Follow follow1 = new Follow();
        follow1.setId(1L);
        Follow follow2 = new Follow();
        follow2.setId(follow1.getId());
        assertThat(follow1).isEqualTo(follow2);
        follow2.setId(2L);
        assertThat(follow1).isNotEqualTo(follow2);
        follow1.setId(null);
        assertThat(follow1).isNotEqualTo(follow2);
    }
}
