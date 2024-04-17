package team.bham.service.impl;

import static java.lang.Math.min;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Artist;
import team.bham.domain.Review;
import team.bham.domain.Track;
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.RecentlyReviewedService;
import team.bham.service.dto.RecentlyReviewedDTO;
import team.bham.service.mapper.ReviewMapper;
import team.bham.service.mapper.TrackMapper;

@Service
@Transactional
public class RecentlyReviewedServiceImpl implements RecentlyReviewedService {

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Override
    public List<RecentlyReviewedDTO> fetchRecentTrack() {
        System.out.println("" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "====================================================================");
        ArrayList<RecentlyReviewedDTO> recentTrackDTO = new ArrayList<>();
        List<Review> rrByTrackName = reviewRepository.fetchRecentReviews();
        System.out.println("rrByTrackName: " + rrByTrackName);
        List<Track> tracks = new ArrayList<>();
        int x = 0;
        while (x < rrByTrackName.size() && x < 50) {
            for (int j = 0; j < min(rrByTrackName.size(), 50); j++) {
                String rrName = rrByTrackName.get(j).getTrack().getName();
                System.out.println("rrName: " + rrName);
                Track trackName = trackRepository.fetchTrackbyRecentReview(rrName);
                System.out.println("trackName: " + trackName);
                tracks.add(trackName);
                System.out.println("tracks: " + tracks);
                x += 1;
                System.out.println("x: " + x);
            }
        }
        for (int i = 0; i < tracks.size(); i++) {
            RecentlyReviewedDTO rrDTO = new RecentlyReviewedDTO();
            rrDTO.setId(i + 1);
            rrDTO.setTrackURI(tracks.get(i).getSpotifyURI());
            rrDTO.setTrackName(tracks.get(i).getName());
            rrDTO.setAlbum(tracks.get(i).getAlbum().getName());
            rrDTO.setRating(tracks.get(i).getRating());
            rrDTO.setImgURL(tracks.get(i).getAlbum().getImageURL());
            Set<Artist> artistSet = tracks.get(i).getArtists();
            List<Artist> artistList = new ArrayList<>(artistSet);
            rrDTO.setArtist(artistList.get(0).getName());
            Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(rrDTO.getTrackURI());
            rrDTO.setReviews(byTrackSpotifyURI.size());
            System.out.println("rrDTO: " + rrDTO);

            recentTrackDTO.add(rrDTO);
            System.out.println("recentTrackDTO: " + recentTrackDTO);
        }        System.out.println("" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "====================================================================");

        return recentTrackDTO;

    }
}
