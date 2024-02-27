package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AlbumMapperTest {

    private AlbumMapper albumMapper;

    @BeforeEach
    public void setUp() {
        albumMapper = new AlbumMapperImpl();
    }
}
