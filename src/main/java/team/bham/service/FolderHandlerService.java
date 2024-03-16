package team.bham.service;

import java.util.List;
import team.bham.service.dto.FetchFolderDTO;

public interface FolderHandlerService {
    public void generateFolder(String folderName, String imageURL, String userId);

    public List<FetchFolderDTO> fetchFolder();
}
