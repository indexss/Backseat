package team.bham.service;

import java.util.List;
import team.bham.service.dto.FetchFolderDTO;
import team.bham.service.dto.FetchFolderEntryDTO;

public interface FolderHandlerService {
    public void generateFolder(String folderName, String userId);

    public List<FetchFolderDTO> fetchFolder();

    public FetchFolderEntryDTO fetchFolderEntry(Long folderId);

    public void addEntryToFolder(String spotifyURI, Long folderId);
}
