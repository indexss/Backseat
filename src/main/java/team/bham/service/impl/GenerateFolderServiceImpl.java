package team.bham.service.impl;

import java.io.IOException;
import java.util.Optional;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
import team.bham.service.GenerateFolderService;

@Service
@Transactional
public class GenerateFolderServiceImpl implements GenerateFolderService {

    @Resource
    private ProfileRepository profileRepository;

    @Resource
    private FolderRepository folderRepository;

    @Override
    public void generateFolder(String folderName, String imageURL, String username) throws IOException {
        Folder folder = new Folder();
        folder.setName(folderName);
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();
        folder.setProfile(profile);

        folderRepository.save(folder);
    }
}
