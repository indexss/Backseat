package team.bham.service.dto;

import team.bham.domain.Profile;

public class ExploreFoldersDTO {

    private int id;
    private long folderId;
    private String folderName;
    private String userName;
    private String image;

    public ExploreFoldersDTO() {}

    public ExploreFoldersDTO(int id, long folderId, String folderName, String userName, String image) {
        this.id = id;
        this.folderId = folderId;
        this.folderName = folderName;
        this.userName = userName;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getFolderId() {
        return folderId;
    }

    public void setFolderId(long folderId) {
        this.folderId = folderId;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
