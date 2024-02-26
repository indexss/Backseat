package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SpotifyConnectionMapperTest {

    private SpotifyConnectionMapper spotifyConnectionMapper;

    @BeforeEach
    public void setUp() {
        spotifyConnectionMapper = new SpotifyConnectionMapperImpl();
    }
}
