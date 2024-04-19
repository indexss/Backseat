package team.bham.service.impl;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
import team.bham.service.ReviewAlbumService;
import team.bham.service.dto.ReviewAlbumDTO;

/**
 * @project : team31
 * @package: team.bham.service.impl
 * @class: ReviewTrackServiceImpl
 * @date: (UTC + 0 London) 03/03/2024 15:37
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

@Service
@Transactional
public class ReviewAlbumServiceImpl implements ReviewAlbumService {

    @Resource
    //get TrackName, get releaseDate, get description
    private TrackRepository trackRepository;

    @Resource
    //get albumName
    private AlbumRepository albumRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private ProfileRepository profileRepository;

    @Override
    public ReviewAlbumDTO fetchAlbumReviewAndAlbumInfo(String albumSpotifyId) {
        ReviewAlbumDTO reviewAlbumDTO = new ReviewAlbumDTO();
        Optional<Album> optionalAlbum = albumRepository.findById(albumSpotifyId);

        try {
            Album album = optionalAlbum.get();
            List<Track> optionalTrackList = trackRepository.findByAlbum(albumSpotifyId);
            reviewAlbumDTO.setAlbumName(album.getName());
            reviewAlbumDTO.setReleaseDate(album.getReleaseDate());
            reviewAlbumDTO.setDescription("");
            Set<Review> reviewSet = new HashSet<>();
            reviewAlbumDTO.setReviewList(reviewSet);
            Set<Track> trackSet = new HashSet<>();
            reviewAlbumDTO.setTrack(trackSet);
            trackSet.addAll(optionalTrackList);
            reviewAlbumDTO.pushTrackList(trackSet);
            reviewAlbumDTO.setImgURL(album.getImageURL());
            reviewAlbumDTO.setTotalTracks(album.getTotalTracks());
            StringBuilder artistNameBuilder = new StringBuilder();
            Set<Artist> artists = album.getArtists();
            List<Artist> artistList = new ArrayList<>(artists);
            for (int i = 0; i < artistList.size(); i++) {
                if (i == artistList.size() - 1) {
                    artistNameBuilder.append(artistList.get(i).getName());
                } else {
                    artistNameBuilder.append(artistList.get(i).getName());
                    artistNameBuilder.append(", ");
                }
            }
            reviewAlbumDTO.setArtistName(artistNameBuilder.toString());

            Set<Track> trackList = reviewAlbumDTO.getTracks();
            Set<Review> reviewList = reviewRepository.findByAlbum(album);
            ArrayList<Review> reviews = new ArrayList<>(reviewList);
            double sum = 0;
            for (int i = 0; i < reviews.size(); i++) {
                sum += reviews.get(i).getRating();
            }
            reviewAlbumDTO.pushAvgRating((sum * 1.0) / reviews.size());
            reviewAlbumDTO.pushReviewList(reviewList);

            reviewAlbumDTO.setAvgRating();
        } catch (Exception e) {}
        //TODO: Error handling

        return reviewAlbumDTO;
    }

    @Override
    public ReviewAlbumDTO fetchReviewAndAlbumInfo(String albumSpotifyId) {
        ReviewAlbumDTO reviewAlbumDTO = new ReviewAlbumDTO();
        Optional<Album> optionalAlbum = albumRepository.findById(albumSpotifyId);

        try {
            Album album = optionalAlbum.get();
            List<Track> optionalTrackList = trackRepository.findByAlbum(albumSpotifyId);
            reviewAlbumDTO.setAlbumName(album.getName());
            reviewAlbumDTO.setReleaseDate(album.getReleaseDate());
            reviewAlbumDTO.setDescription("");
            Set<Review> reviewSet = new HashSet<>();
            reviewAlbumDTO.setReviewList(reviewSet);
            Set<Track> trackSet = new HashSet<>();
            reviewAlbumDTO.setTrack(trackSet);
            trackSet.addAll(optionalTrackList);
            reviewAlbumDTO.pushTrackList(trackSet);
            reviewAlbumDTO.setImgURL(album.getImageURL());
            reviewAlbumDTO.setTotalTracks(album.getTotalTracks());
            StringBuilder artistNameBuilder = new StringBuilder();
            Set<Artist> artists = album.getArtists();
            List<Artist> artistList = new ArrayList<>(artists);
            for (int i = 0; i < artistList.size(); i++) {
                if (i == artistList.size() - 1) {
                    artistNameBuilder.append(artistList.get(i).getName());
                } else {
                    artistNameBuilder.append(artistList.get(i).getName());
                    artistNameBuilder.append(", ");
                }
            }
            reviewAlbumDTO.setArtistName(artistNameBuilder.toString());

            Set<Track> trackList = reviewAlbumDTO.getTracks();
            System.out.println(trackList + "==============================");
            ArrayList<Track> tracks = new ArrayList<>(trackList);
            for (int j = 0; j < reviewAlbumDTO.getTracks().size(); j++) {
                Set<Review> reviewList = reviewRepository.findByTrackSpotifyURI(tracks.get(j).getSpotifyURI());
                ArrayList<Review> reviews = new ArrayList<>(reviewList);
                double sum = 0;
                for (int i = 0; i < reviews.size(); i++) {
                    sum += reviews.get(i).getRating();
                }
                reviewAlbumDTO.pushAvgRating((sum * 1.0) / reviews.size());
                reviewAlbumDTO.pushReviewList(reviewList);
            }
            System.out.println(reviewAlbumDTO.getReviewList());
            reviewAlbumDTO.setAvgRating();
        } catch (Exception e) {}
        //TODO: Error handling

        return reviewAlbumDTO;
    }

    @Override
    public void addReview(int rating, String content, String albumId, String username) {
        Review newReview = new Review();
        newReview.setRating(rating);
        newReview.setContent(content);
        newReview.setDate(Instant.now());

        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();
        newReview.setProfile(profile);

        Optional<Album> optionalAlbum = albumRepository.findById(albumId);
        Album album = optionalAlbum.get();
        newReview.setAlbum(album);

        Optional<Album> album_ = albumRepository.findById(albumId);
        Album album__ = album_.get();
        reviewRepository.save(newReview);
        Set<Review> reviews = reviewRepository.findByAlbum(album__);
        System.out.println(albumId);
        List<Review> reviewList = new ArrayList<>(reviews);
        double sum = 0;
        double avgRating = 0;
        for (int i = 0; i < reviewList.size(); i++) {
            sum += reviewList.get(i).getRating();
        }
        avgRating = sum / reviewList.size();
        album.setRating(avgRating);
        albumRepository.save(album);
    }

    @Override
    public void deleteReview(String albumId, String username) {
        //        System.out.println("888888888888: " + trackId);
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();

        Optional<Album> optionalAlbum = albumRepository.findById(albumId);
        Album album = optionalAlbum.get();
        Set<Review> reviews = reviewRepository.findByAlbum(album);

        Iterator<Review> iterator = reviews.iterator();

        while (iterator.hasNext()) {
            Review review = iterator.next();
            if (review.getProfile().equals(profile)) {
                System.out.println(review);
                System.out.println(
                    "Test Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review Deleting" +
                    "Test Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review Deleting" +
                    "Test Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review Deleting" +
                    "Test Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review DeletingTest Review Deleting"
                );
                System.out.println(review);
                iterator.remove();
                reviewRepository.delete(review);
            }
            System.out.println(albumId);
            List<Review> reviewList = new ArrayList<>(reviews);
            double sum = 0;
            double avgRating = 0;
            for (int i = 0; i < reviewList.size(); i++) {
                sum += reviewList.get(i).getRating();
            }
            avgRating = sum / reviewList.size();
            album.setRating(avgRating);
            albumRepository.save(album);
        }
    }

    @Override
    public Boolean checkExistAlbum(String albumId) {
        Optional<Album> optionalAlbum = albumRepository.findById(albumId);
        return optionalAlbum.isPresent();
    }
}
