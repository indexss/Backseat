package team.bham.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
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

    public List<LeaderboardTrackDTO> fetchTrackLeaderboardPagination(int page, int size);

    public List<LeaderboardTrackDTO> fetchLeaderboardWithFilter(
        String category,
        String key,
        LocalDate startTime,
        LocalDate endTime,
        String order,
        String search,
        int page,
        int size
    );
}
