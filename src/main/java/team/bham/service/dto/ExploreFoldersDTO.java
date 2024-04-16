package team.bham.service.dto;

import team.bham.domain.Profile;

public class ExploreFoldersDTO {

    private int id;
    private long folderId;
    private String folderName;
    private Profile profile;
    private byte[] image; //may need to change to ImgURL and do something with FetchFolderDTO

    public ExploreFoldersDTO() {}

    public ExploreFoldersDTO(byte[] image, int id, long folderId, String folderName, Profile profile) {
        this.image = image;
        this.id = id;
        this.folderId = folderId;
        this.folderName = folderName;
        this.profile = profile;
    }

    public int getId() {
        return id;
    }

    public int setId(int id) {
        this.id = id;
        return id;
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

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
