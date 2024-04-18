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
import team.bham.repository.ReviewRepository;
import team.bham.repository.TrackRepository;
import team.bham.service.LeaderboardFolderService;
import team.bham.service.dto.LeaderboardTrackDTO;

@Service
@Transactional
public class LeaderboardFolderServiceImpl implements LeaderboardFolderService {

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Override
    public List<LeaderboardTrackDTO> fetchTrackLeaderboard() {
        ArrayList<LeaderboardTrackDTO> leaderboardTrackDTOS = new ArrayList<>();
        List<Track> tracks = trackRepository.fetchTrackByRating();
        for (int i = 0; i < tracks.size(); i++) {
            LeaderboardTrackDTO dto = new LeaderboardTrackDTO();
            dto.setId(i + 1);
            dto.setTrackName(tracks.get(i).getName());
            dto.setAlbum(tracks.get(i).getAlbum().getName());
            dto.setImgURL(tracks.get(i).getAlbum().getImageURL());
            dto.setRating(tracks.get(i).getRating());
            dto.setTrackURI(tracks.get(i).getSpotifyURI());
            Set<Review> byTrackSpotifyURI = reviewRepository.findByTrackSpotifyURI(dto.getTrackURI());
            dto.setReviews(byTrackSpotifyURI.size());
            Set<Artist> artists = tracks.get(i).getArtists();
            List<Artist> artistList = new ArrayList<>(artists);
            StringBuilder artistNameBuilder = new StringBuilder();
            for (int j = 0; j < artistList.size(); j++) {
                if (j == artistList.size() - 1) {
                    artistNameBuilder.append(artistList.get(j).getName());
                } else {
                    artistNameBuilder.append(artistList.get(j).getName());
                    artistNameBuilder.append(", ");
                }
            }
            dto.setArtist(artistNameBuilder.toString());

            leaderboardTrackDTOS.add(dto);
        }
        return leaderboardTrackDTOS;
    }
}
