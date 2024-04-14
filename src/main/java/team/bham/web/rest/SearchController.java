package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.bham.service.LeaderboardService;
import team.bham.service.dto.LeaderboardTrackDTO;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Resource
    private LeaderboardService leaderboardService;

    @GetMapping("/")
    public ResponseUtils fetchTrackLeaderboard() {
        ResponseUtils resp = null;
        try {
            List<LeaderboardTrackDTO> leaderboardTrackDTOS = leaderboardService.fetchTrackLeaderboard();
            resp = new ResponseUtils().put("leaderboard", leaderboardTrackDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
