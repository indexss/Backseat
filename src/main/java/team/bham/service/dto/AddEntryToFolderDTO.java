package team.bham.service.dto;

public class AddEntryToFolderDTO {

    private String spotifyURI;
    private Long folderId;

    public AddEntryToFolderDTO(String spotifyURI, Long folderId) {
        this.spotifyURI = spotifyURI;
        this.folderId = folderId;
    }

    public AddEntryToFolderDTO() {}

    public String getSpotifyURI() {
        return spotifyURI;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }
}
