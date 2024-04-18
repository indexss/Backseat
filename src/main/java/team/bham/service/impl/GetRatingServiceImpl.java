package team.bham.service.impl;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import team.bham.repository.TrackRepository;
import team.bham.service.GetRatingService;
import team.bham.service.dto.GetRatingDTO;

@Service
@Transactional
public class GetRatingServiceImpl implements GetRatingService {

    @Resource
    private TrackRepository trackRepository;

    @Override
    public GetRatingDTO GetTrackRating() {
        GetRatingDTO grDTO = new GetRatingDTO();
        //GetTrackRating
        //grDTO.setRating(trackRepository.GetTrackRating());
        grDTO.setRating(1.0);
        return grDTO;
    }
}
