package team.bham.service.impl;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Base64;
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

        //List<Folder> allFolders = folderRepository.findAll();
        List<Folder> allFolders = folderRepository.findAllOrderByIdAsc();
        //System.out.println("allFolders: " + allFolders);
        List<Folder> chosenFolders = new ArrayList<>() {};

        ArrayList<Long> numbers = new ArrayList<Long>();

        int x = 0;
        while (x < allFolders.size() && x < 12) {
            long lowLimit = 0;
            long highLimit = allFolders.size();
            //System.out.println("highLimit: " + highLimit);
            long random_long = lowLimit + (long) (Math.random() * (highLimit - lowLimit));
            while (numbers.contains(random_long)) {
                random_long = lowLimit + (long) (Math.random() * (highLimit - lowLimit));
            }
            numbers.add(random_long);
            Folder oneFolder = allFolders.get((int) random_long);
            //System.out.println("oneFolder: " + oneFolder);
            chosenFolders.add(oneFolder);
            //System.out.println("chosenFolders: " + chosenFolders);
            //System.out.println("chosenFolderssize: " + chosenFolders.size());
            x += 1;
        }
        for (int j = 0; j < chosenFolders.size(); j++) {
            ExploreFoldersDTO folderDTO = new ExploreFoldersDTO();
            folderDTO.setId(j + 1);
            folderDTO.setFolderId(chosenFolders.get(j).getId());
            //System.out.println("folderDTO1: " + folderDTO);
            folderDTO.setFolderName(chosenFolders.get(j).getName());
            //System.out.println("folderDTO2: " + folderDTO);
            folderDTO.setUsername(chosenFolders.get(j).getProfile().getUsername());
            //System.out.println("folderDTO3: " + folderDTO);

            //TODO fix this so that null image will display if null
            byte[] ix = chosenFolders.get(j).getImage();
            if (ix != null) {
                String image = createImageURL(ix, chosenFolders.get(j).getImageContentType());
                folderDTO.setImage(image);
            } else {
                folderDTO.setImage(
                    "data:image/png;base64,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"
                );
            }
            //System.out.println("Image:" + image);
            //System.out.println("folderDTO4: " + folderDTO);

            randFoldersDTO.add(folderDTO);
            //System.out.println("folderDTO: " + folderDTO);
        } //System.out.println("randFoldersDTO: " + randFoldersDTO);
        return randFoldersDTO;
    }

    public String createImageURL(byte[] image, String imageContentType) {
        String imageDataString = Base64.getEncoder().encodeToString(image);
        String imageURL = "data:" + imageContentType + ";base64," + imageDataString;
        return imageURL;
    }
}
