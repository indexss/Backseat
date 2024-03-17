package team.bham.service.dto;

import java.util.Set;
import team.bham.domain.FolderEntry;

public class FetchFolderEntryDTO {

    private String folderName;
    private String imageURL;
    private Set<FolderEntry> folderEntries;

    public FetchFolderEntryDTO() {}

    public FetchFolderEntryDTO(String folderName, String imageURL, Set<FolderEntry> folderEntries) {
        this.folderName = folderName;
        this.imageURL = imageURL;
        this.folderEntries = folderEntries;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Set<FolderEntry> getFolderEntries() {
        return folderEntries;
    }

    public void setFolderEntries(Set<FolderEntry> folderEntries) {
        this.folderEntries = folderEntries;
    }
}
