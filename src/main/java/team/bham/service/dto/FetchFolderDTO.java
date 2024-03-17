package team.bham.service.dto;

public class FetchFolderDTO {

    private int id;

    private long folderId;

    private String folderName;
    private String imageURL;

    public FetchFolderDTO() {}

    public FetchFolderDTO(int id, long folderId, String folderName, String imageURL) {
        this.id = id;
        this.folderId = folderId;
        this.folderName = folderName;
        this.imageURL = imageURL;
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

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
