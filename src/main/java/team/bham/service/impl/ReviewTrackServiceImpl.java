package team.bham.service.impl;

import java.time.Instant;
import java.util.*;
import javax.annotation.Resource;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
import team.bham.service.ReviewTrackSevice;
import team.bham.service.dto.ReviewTrackDTO;

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
public class ReviewTrackServiceImpl implements ReviewTrackSevice {

    @Resource
    //get trackName, get releaseDate, get description
    private TrackRepository trackRepository;

    @Resource
    //get albumName
    private AlbumRepository albumRepository;

    @Resource
    //    //get reviewList
    private ReviewRepository reviewRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private ProfileRepository profileRepository;

    @Override
    public ReviewTrackDTO fetchReviewAndTrackInfo(String trackSpotifyId) {
        ReviewTrackDTO reviewTrackDTO = new ReviewTrackDTO();
        Optional<Track> optionalTrack = trackRepository.findById(trackSpotifyId);
        try {
            Track track = optionalTrack.get();
            reviewTrackDTO.setTrackName(track.getName());
            reviewTrackDTO.setReleaseDate(track.getReleaseDate());
            reviewTrackDTO.setDescription("");
            reviewTrackDTO.setAlbumName(track.getAlbum().getName());
            reviewTrackDTO.setImgURL(track.getAlbum().getImageURL());
            reviewTrackDTO.setAlbumURI(track.getAlbum().getSpotifyURI());
            System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.out.println(reviewTrackDTO.getAlbumURI());
            System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            StringBuilder artistNameBuilder = new StringBuilder();
            Set<Artist> artists = track.getAlbum().getArtists();
            List<Artist> artistList = new ArrayList<>(artists);
            for (int i = 0; i < artistList.size(); i++) {
                if (i == artistList.size() - 1) {
                    artistNameBuilder.append(artistList.get(i).getName());
                } else {
                    artistNameBuilder.append(artistList.get(i).getName());
                    artistNameBuilder.append(", ");
                }
            }
            reviewTrackDTO.setArtistName(artistNameBuilder.toString());
            Set<Review> reviewList = reviewRepository.findByTrackSpotifyURI(trackSpotifyId);
            System.out.println(artistNameBuilder.toString());
            System.out.println(artists);
            System.out.println(artistList);
            ArrayList<Review> reviews = new ArrayList<>(reviewList);
            double sum = 0;
            for (int i = 0; i < reviews.size(); i++) {
                sum += reviews.get(i).getRating();
            }
            reviewTrackDTO.setAvgRating((sum * 1.0) / reviews.size());

            reviewTrackDTO.setReviewList(reviewList);
        } catch (Exception e) {}
        //TODO: Error handling

        return reviewTrackDTO;
    }

    @Override
    public void addReview(int rating, String content, String trackId, String username) {
        Review newReview = new Review();
        newReview.setRating(rating);
        newReview.setContent(content);
        newReview.setDate(Instant.now());

        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();
        newReview.setProfile(profile);

        Optional<Track> optionalTrack = trackRepository.findBySpotifyURI(trackId);
        Track track = optionalTrack.get();
        newReview.setTrack(track);

        reviewRepository.save(newReview);

        Set<Review> reviews = reviewRepository.findByTrackSpotifyURI(trackId);
        List<Review> reviewList = new ArrayList<>(reviews);
        double sum = 0;
        double avgRating = 0;
        for (int i = 0; i < reviewList.size(); i++) {
            sum += reviewList.get(i).getRating();
        }
        avgRating = sum / reviewList.size();
        track.setRating(avgRating);
        trackRepository.save(track);
    }

    @Override
    public void deleteReview(String trackId, String username) {
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();

        Optional<Track> optionalTrack = trackRepository.findById(trackId);
        Track track = optionalTrack.get();
        Set<Review> reviews = reviewRepository.findByTrackSpotifyURI(track.getSpotifyURI());

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
            List<Review> reviewList = new ArrayList<>(reviews);
            double sum = 0;
            double avgRating = 0;
            for (int i = 0; i < reviewList.size(); i++) {
                sum += reviewList.get(i).getRating();
            }
            avgRating = sum / reviewList.size();
            track.setRating(avgRating);
            trackRepository.save(track);
        }
    }

    @Override
    public Boolean checkExist(String trackId) {
        Optional<Track> optionalTrack = trackRepository.findById(trackId);
        return optionalTrack.isPresent();
    }
}
