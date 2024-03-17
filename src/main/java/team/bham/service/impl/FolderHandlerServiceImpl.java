package team.bham.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
import team.bham.service.FolderHandlerService;
import team.bham.service.dto.FetchFolderDTO;
import team.bham.service.dto.FetchFolderEntryDTO;

@Service
@Transactional
public class FolderHandlerServiceImpl implements FolderHandlerService {

    @Resource
    private ProfileRepository profileRepository;

    @Resource
    private FolderRepository folderRepository;

    @Resource
    private FolderEntryRepository folderEntryRepository;

    @Override
    public void generateFolder(String folderName, String imageURL, String username) {
        Folder folder = new Folder();
        folder.setName(folderName);
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();
        folder.setProfile(profile);
        folderRepository.save(folder);
    }

    @Override
    public List<FetchFolderDTO> fetchFolder() {
        ArrayList<FetchFolderDTO> fetchFolderDTOS = new ArrayList<>();
        List<Folder> folders = folderRepository.findAll();
        for (int i = 0; i < folders.size(); i++) {
            FetchFolderDTO dto = new FetchFolderDTO();
            dto.setId(i + 1);
            dto.setFolderId(folders.get(i).getId());
            dto.setFolderName(folders.get(i).getName());
            dto.setImageURL("https://i.scdn.co/image/ab67616d00001e02904445d70d04eb24d6bb79ac");
            fetchFolderDTOS.add(dto);
        }
        return fetchFolderDTOS;
    }

    @Override
    public FetchFolderEntryDTO fetchFolderEntry(Long folderId) {
        FetchFolderEntryDTO fetchFolderEntryDTO = new FetchFolderEntryDTO();
        Optional<Folder> optionalfolder = folderRepository.findById(folderId);
        Folder folder = optionalfolder.get();
        fetchFolderEntryDTO.setFolderName(folder.getName());
        Set<FolderEntry> folderEntryList = folderEntryRepository.findByFolderId(folderId);
        fetchFolderEntryDTO.setFolderEntries(folderEntryList);
        return fetchFolderEntryDTO;
    }
}
