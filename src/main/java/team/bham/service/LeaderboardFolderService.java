package team.bham.service;

import java.util.List;
import team.bham.service.dto.LeaderboardTrackDTO;

public interface LeaderboardFolderService {
    public List<LeaderboardTrackDTO> fetchTrackLeaderboard();
}
