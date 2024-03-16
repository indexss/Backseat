package team.bham.service.dto;

public class FetchFolderDTO {

    private int id;
    private String folderName;
    private String imageURL;

    public FetchFolderDTO(int id, String folderName, String imageURL) {
        this.id = id;
        this.folderName = folderName;
        this.imageURL = imageURL;
    }

    public FetchFolderDTO() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
