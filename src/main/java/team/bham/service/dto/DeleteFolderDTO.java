package team.bham.service.dto;

public class DeleteFolderDTO {

    Long folderId;

    public DeleteFolderDTO() {}

    public DeleteFolderDTO(Long folderId) {
        this.folderId = folderId;
    }

    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }
}
