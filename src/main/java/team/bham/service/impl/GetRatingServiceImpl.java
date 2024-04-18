package team.bham.service.impl;

import java.util.Optional;
import javax.annotation.Resource;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import team.bham.domain.Track;
import team.bham.repository.TrackRepository;
import team.bham.service.GetRatingService;
import team.bham.service.dto.GetRatingDTO;

@Service
@Transactional
public class GetRatingServiceImpl implements GetRatingService {

    @Resource
    private TrackRepository trackRepository;

    @Override
    public GetRatingDTO GetTrackRating(String spotifyURI) {
        GetRatingDTO grDTO = new GetRatingDTO();
        //GetTrackRating
        //grDTO.setRating(trackRepository.GetTrackRating());
        Optional<Track> optionalTrack = trackRepository.findBySpotifyURI(spotifyURI);
        if (optionalTrack.isPresent()) {
            Track track = optionalTrack.get();
            grDTO.setRating(track.getRating());
        } else {
            grDTO.setRating(null);
        }

        return grDTO;
    }
}
