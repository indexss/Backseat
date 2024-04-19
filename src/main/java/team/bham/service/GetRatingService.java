package team.bham.service;

import team.bham.service.dto.GetRatingDTO;

public interface GetRatingService {
    public GetRatingDTO GetTrackRating(String spotifyURI);
}
