package team.bham.service.dto;

public class AddFolderDTO {

    private String folderName;
    private String imgURL;

    public AddFolderDTO() {}

    public AddFolderDTO(String folderName, String imgURL) {
        this.folderName = folderName;
        this.imgURL = imgURL;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }
}
