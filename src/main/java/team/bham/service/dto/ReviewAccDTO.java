package team.bham.service.dto;

public class ReviewAccDTO {

    private String accountName;
    private String spotifyName;

    public void setAccountName(String name) {
        accountName = name;
    }

    public String getAccountName() {
        return this.accountName;
    }

    public void setSpotifyName(String name) {
        spotifyName = name;
    }

    public String getSpotifyName() {
        return this.spotifyName;
    }
}
