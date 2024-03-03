package team.bham.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Album;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ArtistRepository;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
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

    //    @Resource
    //    //get artistName
    //    private ArtistRepository artistRepository;
    @Resource
    //    //get reviewList
    private ReviewRepository reviewRepository;

    @Override
    public ReviewTrackDTO fetchReviewAndTrackInfo(String trackSpotifyId) {
        ReviewTrackDTO reviewTrackDTO = new ReviewTrackDTO();
        Optional<Track> optionalTrack = trackRepository.findById(trackSpotifyId);

        Track track = optionalTrack.get();
        reviewTrackDTO.setTrackName(track.getName());
        reviewTrackDTO.setReleaseDate(track.getReleaseDate());
        reviewTrackDTO.setDescription(track.getDescription());
        //        Optional<Album> optionalAlbum = albumRepository.findById(track.getAlbum().getId());
        //        reviewTrackDTO.setAlbumName(optionalAlbum.get().getName());
        reviewTrackDTO.setAlbumName(track.getAlbum().getName());
        reviewTrackDTO.setArtistName(track.getArtists().toString());
        //        reviewTrackDTO.setReviewList(track.getReviews());
        Set<Review> reviewList = reviewRepository.findByTrackSpotifyURI(trackSpotifyId);
        reviewTrackDTO.setReviewList(reviewList);

        //TODO: Error handling

        return reviewTrackDTO;
    }
}
