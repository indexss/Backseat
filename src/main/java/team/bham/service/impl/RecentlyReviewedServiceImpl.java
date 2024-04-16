package team.bham.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Artist;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.RecentlyReviewedService;
import team.bham.service.dto.RecentlyReviewedDTO;

@Service
@Transactional
public class RecentlyReviewedServiceImpl implements RecentlyReviewedService {

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private AlbumRepository albumRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Override
    public List<RecentlyReviewedDTO> fetchRecentTrack() {
        ArrayList<RecentlyReviewedDTO> recentTrackDTO = new ArrayList<>();

        /*Set<Review> reviewList = reviewRepository.findByTrackSpotifyURI(tracks.get(j).getSpotifyURI());
        ArrayList<Review> reviews = new ArrayList<>(reviewList);*/
        /*TODO*/
        List<Review> rrByTrackName = reviewRepository.fetchRecentReviews();
        List<Track> tracks = new ArrayList<>() {};/*need an empty list for tracks to go into*/
        /* TODO Authenticate track somehow*/
        int x = 0;
        while (x < rrByTrackName.size()) {
            for (int j = 0; j < 50; j++) {
                /*fetch track info from track name*/
                String rrName = rrByTrackName.get(j).getTrack().getName();
                Track trackName = trackRepository.fetchTrackbyRecentReview(rrName);
                if (rrByTrackName.get(j).getAlbum() == trackName.getAlbum()) {
                    tracks.add(trackName);
                }/*else {
                j -= 1;
                }*/
                x += 1;
            }
        }
        for (int i = 0; i < tracks.size(); i++) {
            RecentlyReviewedDTO rrDTO = new RecentlyReviewedDTO();
            rrDTO.setId(i + 1);
            rrDTO.setTrackURI(tracks.get(i).getSpotifyURI());
            rrDTO.setTrackName(tracks.get(i).getName());
            rrDTO.setAlbum(tracks.get(i).getAlbum().getName());
            rrDTO.setRating(tracks.get(i).getRating());
            Set<Artist> artistSet = tracks.get(i).getArtists();
            List<Artist> artistList = new ArrayList<>(artistSet);
            rrDTO.setArtist(artistList.get(0).getName());

            recentTrackDTO.add(rrDTO);
        }
        return recentTrackDTO;
    }
}
