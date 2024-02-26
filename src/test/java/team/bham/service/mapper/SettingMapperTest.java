package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SettingMapperTest {

    private SettingMapper settingMapper;

    @BeforeEach
    public void setUp() {
        settingMapper = new SettingMapperImpl();
    }
}
