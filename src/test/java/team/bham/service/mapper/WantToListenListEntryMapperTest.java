package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WantToListenListEntryMapperTest {

    private WantToListenListEntryMapper wantToListenListEntryMapper;

    @BeforeEach
    public void setUp() {
        wantToListenListEntryMapper = new WantToListenListEntryMapperImpl();
    }
}
