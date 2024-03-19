package team.bham.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.service.dto.ReviewTrackDTO;
import team.bham.web.rest.PublicUserResource;

/**
 * @project : team31
 * @package: team.bham.service.dto
 * @class: ReviewTrackDTO
 * @date: (UTC + 0 London) 03/03/2024 15:24
 * @author: Finn  (annihi0822@gamil.com)
 * @description: DTO for loading data about review on Track
 */

public class ReviewAlbumDTO implements Serializable {

    private String albumName;
    private String artistName;
    private LocalDate releaseDate;
    private String description;

    private int totalTracks;

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    private String imgURL;
    private Set<Review> reviewList;

    private Set<Track> trackList;

    public double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(double avgRating) {
        this.avgRating = avgRating;
    }

    private ArrayList<Double> avgRatingList = new ArrayList<>();

    private double avgRating;

    public ReviewAlbumDTO() {}

    public ReviewAlbumDTO(
        String albumName,
        String artistName,
        LocalDate releaseDate,
        String description,
        String imgURL,
        Set<Review> reviewList,
        double avgRating,
        int totalTracks,
        Set<Track> trackList,
        ArrayList<Double> avgRatingList
    ) {
        this.albumName = albumName;
        this.artistName = artistName;
        this.releaseDate = releaseDate;
        this.description = description;
        this.imgURL = imgURL;
        this.reviewList = reviewList;
        this.avgRating = avgRating;
        this.totalTracks = totalTracks;
        this.trackList = trackList;
        this.avgRatingList = avgRatingList;
    }

    public int getTotalTracks() {
        return totalTracks;
    }

    public void setTotalTracks(int totalTracks) {
        this.totalTracks = totalTracks;
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

    public void pushReviewList(Set<Review> newReviews) {
        this.reviewList.addAll(newReviews);
    }

    public void setReviewList(Set<Review> reviewList) {
        this.reviewList = reviewList;
    }

    public Set<Track> getTracks() {
        return trackList;
    }

    public void pushAvgRating(double averageRating) {
        this.avgRatingList.add(averageRating);
    }

    public void setAvgRating() {
        if (avgRatingList.isEmpty()) {
            this.avgRating = 0.0;
        }
        double sum = 0.0;
        for (double rating : avgRatingList) {
            sum += rating;
        }

        this.avgRating = sum / avgRatingList.size(); // 平均值等于总和除以元素个数
    }

    public void setTrack(Set<Track> trackList) {
        this.trackList = trackList;
    }
}
