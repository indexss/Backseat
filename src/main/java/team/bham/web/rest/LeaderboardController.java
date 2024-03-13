package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.bham.service.LeaderboardService;
import team.bham.service.dto.LeaderboardTrackDTO;
import team.bham.utils.ResponseUtils;

/**
 * @project : team31
 * @package: team.bham.web
 * @class: LeaderboardController
 * @date: (UTC + 0 London) 04/03/2024 11:43
 * @author: indexss (cnshilinli@gmail.com)
 * @description: TODO
 */

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    @Resource
    private LeaderboardService leaderboardService;

    @GetMapping("/track")
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

    @GetMapping("/track/pagination")
    public ResponseUtils fetchTrackLeaderboardPagination(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "5") int size
    ) {
        ResponseUtils resp = null;
        try {
            List<LeaderboardTrackDTO> leaderboardTrackDTOS = leaderboardService.fetchTrackLeaderboardPagination(page, size);
            resp = new ResponseUtils().put("leaderboard", leaderboardTrackDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
