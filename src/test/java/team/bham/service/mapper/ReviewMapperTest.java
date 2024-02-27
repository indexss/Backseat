package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReviewMapperTest {

    private ReviewMapper reviewMapper;

    @BeforeEach
    public void setUp() {
        reviewMapper = new ReviewMapperImpl();
    }
}
