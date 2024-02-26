package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FolderEntryMapperTest {

    private FolderEntryMapper folderEntryMapper;

    @BeforeEach
    public void setUp() {
        folderEntryMapper = new FolderEntryMapperImpl();
    }
}
