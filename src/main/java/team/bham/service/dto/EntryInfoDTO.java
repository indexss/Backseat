package team.bham.service.dto;

public class EntryInfoDTO {

    String entryName;
    String entryImageURL;

    public EntryInfoDTO() {}

    public EntryInfoDTO(String entryName, String entryImageURL) {
        this.entryName = entryName;
        this.entryImageURL = entryImageURL;
    }

    public String getEntryName() {
        return entryName;
    }

    public void setEntryName(String entryName) {
        this.entryName = entryName;
    }

    public String getEntryImageURL() {
        return entryImageURL;
    }

    public void setEntryImageURL(String entryImageURL) {
        this.entryImageURL = entryImageURL;
    }
}
