package team.bham.service;

import java.util.List;
import team.bham.service.dto.LeaderboardTrackDTO;

/**
 * @project : team31
 * @package: team.bham.service
 * @interface: LeaderboardService
 * @date: (UTC + 0) 04/03/2024 11:50
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

public interface LeaderboardService {
    public List<LeaderboardTrackDTO> fetchTrackLeaderboard();
}
