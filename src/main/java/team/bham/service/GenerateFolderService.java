package team.bham.service;

import java.io.IOException;

public interface GenerateFolderService {
    public void generateFolder(String folderName, String imageURL, String userId) throws IOException;
}
