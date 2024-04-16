package team.bham.service.impl;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Folder;
import team.bham.domain.Profile;
import team.bham.repository.FolderRepository;
import team.bham.service.ExploreFoldersService;
import team.bham.service.dto.ExploreFoldersDTO;

@Service
@Transactional
public class ExploreFoldersServiceImpl implements ExploreFoldersService {

    @Resource
    private FolderRepository folderRepository;

    @Override
    public List<ExploreFoldersDTO> fetchRandomFolders() {
        //fetch 10 randomly selected folders
        ArrayList<ExploreFoldersDTO> randFoldersDTO = new ArrayList<>();

        List<Folder> allFolders = folderRepository.findAll();
        List<Folder> chosenFolders = new ArrayList<>() {};

        for (int i = 0; i < 10; i++) {
            long leftLimit = 0;
            long rightLimit = allFolders.size();
            long random_long = leftLimit + (long) (Math.random() * (rightLimit - leftLimit));
            Folder oneFolder = folderRepository.getById(random_long);
            chosenFolders.add(oneFolder);
        }
        for (int j = 0; j < chosenFolders.size(); j++) {
            ExploreFoldersDTO folderDTO = new ExploreFoldersDTO();
            folderDTO.setId(j + 1);
            folderDTO.setFolderName(chosenFolders.get(j).getName());
            folderDTO.setFolderId(chosenFolders.get(j).getId());
            folderDTO.setProfile(chosenFolders.get(j).getProfile());
            folderDTO.setImage(chosenFolders.get(j).getImage());

            randFoldersDTO.add(folderDTO);
        }
        return randFoldersDTO;
    }
}
