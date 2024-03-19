package team.bham.service.impl;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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

    //    @Resource
    //    //get artistName
    //    private ArtistRepository artistRepository;
    @Resource
    //    //get reviewList
    private ReviewRepository reviewRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private ProfileRepository profileRepository;

    @Override
    public ReviewAlbumDTO fetchReviewAndAlbumInfo(String albumSpotifyId) {
        ReviewAlbumDTO reviewAlbumDTO = new ReviewAlbumDTO();
        Optional<Album> optionalAlbum = albumRepository.findById(albumSpotifyId);
        try {
            Album album = optionalAlbum.get();
            reviewAlbumDTO.setAlbumName(album.getName());
            reviewAlbumDTO.setReleaseDate(album.getReleaseDate());
            reviewAlbumDTO.setDescription("");
            //        Optional<Album> optionalAlbum = albumRepository.findById(track.getAlbum().getId());
            //        reviewTrackDTO.setAlbumName(optionalAlbum.get().getName());
            /*
                list of track in the album, the first edition is on clicking the
                album, showing list of tracks in the album. So only the name.
                later: I will try to add functionality: on clikcing redirect to the
                specific track;
             */
            reviewAlbumDTO.setTrack(album.getTracks());
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

            //        reviewTrackDTO.setArtistName(track.getArtists().toString());
            //        reviewTrackDTO.setReviewList(track.getReviews());

            Set<Track> trackList = reviewAlbumDTO.getTracks();
            ArrayList<Track> tracks = new ArrayList<>(trackList);
            for (int j = 0; j < reviewAlbumDTO.getTotalTracks(); j++) {
                Set<Review> reviewList = reviewRepository.findByTrackSpotifyURI(tracks.get(j).getSpotifyURI());
                ArrayList<Review> reviews = new ArrayList<>(reviewList);
                double sum = 0;
                for (int i = 0; i < reviews.size(); i++) {
                    sum += reviews.get(i).getRating();
                }
                reviewAlbumDTO.pushAvgRating((sum * 1.0) / reviews.size());
                reviewAlbumDTO.pushReviewList(reviewList);
            }
            reviewAlbumDTO.setAvgRating();
        } catch (Exception e) {}
        //TODO: Error handling

        return reviewAlbumDTO;
    }

    //    @Override
    //    public ReviewAlbumDTO fetchReviewAndAlbumInfo(String albumSpotifyId) {
    //        return null;
    //    }

    @Override
    public void addReview(int rating, String content, String albumId, String username) {
        Review newReview = new Review();
        newReview.setRating(rating);
        newReview.setContent(content);
        newReview.setDate(Instant.now());

        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();
        newReview.setProfile(profile);

        //        System.out.println("888888888888: " + trackId);
        Optional<Album> optionalAlbum = albumRepository.findById(albumId);
        Album album = optionalAlbum.get();
        newReview.setAlbum(album);

        reviewRepository.save(newReview);

        Set<Review> reviews = reviewRepository.findByAlbumSpotifyURI(albumId);
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
    public Boolean checkExistAlbum(String albumId) {
        Optional<Album> optionalAlbum = albumRepository.findById(albumId);
        return optionalAlbum.isPresent();
    }

    public Set<String> getTrackNames(Set<Track> tracks) {
        // 使用 Java 8 Stream API 将每个 track 的名称转换为一个 Set<String>
        return tracks
            .stream()
            .map(Track::getName) // Track::getName 是方法引用，它调用每个 track 的 getName 方法
            .collect(Collectors.toSet()); // 将结果收集到 Set 中
    }
}
