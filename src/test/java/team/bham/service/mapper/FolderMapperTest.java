package team.bham.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class FolderMapperTest {

    private FolderMapper folderMapper;

    @BeforeEach
    public void setUp() {
        folderMapper = new FolderMapperImpl();
    }
}
