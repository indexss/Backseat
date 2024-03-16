package team.bham.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
import team.bham.service.FolderHandlerService;
import team.bham.service.dto.FetchFolderDTO;
import team.bham.service.dto.FolderDTO;

@Service
@Transactional
public class FolderHandlerServiceImpl implements FolderHandlerService {

    @Resource
    private ProfileRepository profileRepository;

    @Resource
    private FolderRepository folderRepository;

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
            dto.setFolderName(folders.get(i).getName());
            dto.setImageURL(
                "https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg"
            );
            fetchFolderDTOS.add(dto);
        }
        return fetchFolderDTOS;
    }
}
