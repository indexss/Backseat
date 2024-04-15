package team.bham.service;

import java.util.List;
import team.bham.service.dto.RecentlyReviewedDTO;

public interface RecentlyReviewedService {
    public List<RecentlyReviewedDTO> fetchRecentTrack();
}
