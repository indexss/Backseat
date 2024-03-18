package team.bham.service.dto;

import java.util.List;
import java.util.Set;
import team.bham.domain.FolderEntry;

public class FetchFolderEntryDTO {

    private String folderName;
    private String imageURL;
    private Set<FolderEntry> folderEntries;

    private List<EntryDTO> entryList;

    public FetchFolderEntryDTO() {}

    public FetchFolderEntryDTO(String folderName, String imageURL, Set<FolderEntry> folderEntries, List<EntryDTO> entryList) {
        this.folderName = folderName;
        this.imageURL = imageURL;
        this.folderEntries = folderEntries;
        this.entryList = entryList;
    }

    public List<EntryDTO> getEntryList() {
        return entryList;
    }

    public void setEntryList(List<EntryDTO> entryList) {
        this.entryList = entryList;
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
