package team.bham.service.dto;

public class EntryDTO {

    private String entryName;

    private String artist;
    private String imageURL;

    public EntryDTO(String entryName, String artist, String imageURL) {
        this.entryName = entryName;
        this.artist = artist;
        this.imageURL = imageURL;
    }

    public EntryDTO() {}

    public String getEntryName() {
        return entryName;
    }

    public void setEntryName(String entryName) {
        this.entryName = entryName;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    @Override
    public String toString() {
        return "EntryDTO{" + "entryName='" + entryName + '\'' + ", imageURL='" + imageURL + '\'' + '}';
    }
}
