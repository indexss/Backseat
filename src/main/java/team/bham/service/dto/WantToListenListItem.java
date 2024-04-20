package team.bham.service.dto;

import org.springframework.data.repository.query.Param;

public class WantToListenListItem {

    private Long id;
    private Long idToDisplay;
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

    public void setIdToDisplay(Long id) {
        this.idToDisplay = id;
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

    public Long getIdToDisplay() {
        return idToDisplay;
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
