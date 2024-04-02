package team.bham.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Set;
import team.bham.domain.Review;

/**
 * @project : team31
 * @package: team.bham.service.dto
 * @class: ReviewTrackDTO
 * @date: (UTC + 0 London) 03/03/2024 15:24
 * @author: indexss (cnshilinli@gmail.com)
 * @description: DTO for loading data about review on Track
 */

public class ReviewTrackDTO implements Serializable {

    private String trackName;
    private String albumName;
    private String artistName;
    private LocalDate releaseDate;
    private String description;

    private String albumURI;

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    private String imgURL;
    private Set<Review> reviewList;

    public double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(double avgRating) {
        this.avgRating = avgRating;
    }

    private double avgRating;

    public ReviewTrackDTO() {}

    public ReviewTrackDTO(
        String albumURI,
        String trackName,
        String albumName,
        String artistName,
        LocalDate releaseDate,
        String description,
        String imgURL,
        Set<Review> reviewList,
        double avgRating
    ) {
        this.trackName = trackName;
        this.albumName = albumName;
        this.artistName = artistName;
        this.releaseDate = releaseDate;
        this.description = description;
        this.imgURL = imgURL;
        this.reviewList = reviewList;
        this.avgRating = avgRating;
        this.albumURI = albumURI;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Review> getReviewList() {
        return reviewList;
    }

    public void setReviewList(Set<Review> reviewList) {
        this.reviewList = reviewList;
    }

    public void setAlbumURI(String albumURI) {
        this.albumURI = albumURI;
    }

    public String getAlbumURI() {
        return this.albumURI;
    }
}
