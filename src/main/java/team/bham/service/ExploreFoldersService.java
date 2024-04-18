package team.bham.service;

import java.util.List;
import team.bham.service.dto.ExploreFoldersDTO;

public interface ExploreFoldersService {
    public List<ExploreFoldersDTO> fetchRandomFolders();
}
