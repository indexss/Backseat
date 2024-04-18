package team.bham.service.dto;

import org.springframework.data.repository.query.Param;

public class WantToListenListItem {

    private Long id;
    private String userId;
    private String itemName;
    private String itemUri;
    private String addTime;
    private String albumName;
    private String artists;
    private int reviewsCount;
    private double rating;
    private String releaseDate;
    private String coverImgUrl;

    public WantToListenListItem(
        @Param("ID") Long id,
        @Param("User ID") String userId,
        @Param("Item Spotify URI") String itemUri,
        @Param("Add Time") String addTime
    ) {
        this.id = id;
        this.userId = userId;
        this.itemUri = itemUri;
        this.addTime = addTime;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setCoverImgUrl(@Param("Cover image URL") String coverImgUrl) {
        this.coverImgUrl = coverImgUrl;
    }

    public void setReviewsCount(int reviewsCount) {
        this.reviewsCount = reviewsCount;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setArtists(String artists) {
        this.artists = artists;
    }

    public void setAlbumName(@Param("Album name **IF APPLY**") String albumName) {
        this.albumName = albumName;
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getItemName() {
        return itemName;
    }

    public String getItemUri() {
        return itemUri;
    }

    public String getAddTime() {
        return addTime;
    }

    public String getArtists() {
        return artists;
    }

    public int getReviewsCount() {
        return reviewsCount;
    }

    public double getRating() {
        return rating;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getCoverImgUrl() {
        return coverImgUrl;
    }

    public String getAlbumName() {
        return albumName;
    }
}

class artist {

    private String name;
    private String spotifyUri;

    public artist(String name, String spotifyUri) {
        this.name = name;
        this.spotifyUri = spotifyUri;
    }

    public String getName() {
        return name;
    }

    public String getSpotifyUri() {
        return spotifyUri;
    }

    public void setSpotifyUri(String spotifyUri) {
        this.spotifyUri = spotifyUri;
    }

    public void setName(String name) {
        this.name = name;
    }
}
