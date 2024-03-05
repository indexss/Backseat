package team.bham.service.dto;

/**
 * @project : team31
 * @package: team.bham.service.dto
 * @class: LeaderboardTrackDTO
 * @date: (UTC + 0 London) 04/03/2024 11:44
 * @author: indexss (cnshilinli@gmail.com)
 * @description: DTO for loading data about Leaderboard on Track
 */

public class LeaderboardTrackDTO {

    private int id;
    private String trackName;
    private String album;
    private Integer reviews;
    private Double rating;
    private String artist;
    private String trackURI;

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    private String imgURL;

    public LeaderboardTrackDTO() {}

    public LeaderboardTrackDTO(
        String imgURL,
        int id,
        String trackName,
        String album,
        Integer reviews,
        Double rating,
        String artist,
        String trackURI
    ) {
        this.id = id;
        this.imgURL = imgURL;
        this.trackName = trackName;
        this.album = album;
        this.reviews = reviews;
        this.rating = rating;
        this.artist = artist;
        this.trackURI = trackURI;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public Integer getReviews() {
        return reviews;
    }

    public void setReviews(Integer reviews) {
        this.reviews = reviews;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getTrackURI() {
        return trackURI;
    }

    public void setTrackURI(String trackURI) {
        this.trackURI = trackURI;
    }
}
