package team.bham.web.rest;

import java.time.LocalDate;
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

    @GetMapping("/filter")
    // I HATE THIS METHOD
    // Why can't JPA select the sorting key and ASC or DESC order through
    // conditional judgment? JPA is too backward.
    public ResponseUtils fetchLeaderboardWithFilter(
        @RequestParam(name = "category", defaultValue = "track") String category,
        @RequestParam(name = "key", defaultValue = "rating") String key,
        @RequestParam(name = "startTime", defaultValue = "1800-01-01") LocalDate startTime,
        @RequestParam(name = "endTime", defaultValue = "2033-01-01") LocalDate endTime,
        @RequestParam(name = "order", defaultValue = "desc") String order,
        @RequestParam(name = "search", defaultValue = "") String text,
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        ResponseUtils resp = null;
        try {
            //            System.out.println(startTime);
            //            System.out.println(endTime);
            //            LocalDate startTime1 = LocalDate.now().minusYears(100);
            //            LocalDate endTime1 = LocalDate.now();
            //打印所有接收到的参数
            System.out.println("-----------------------------------");
            System.out.println("category: " + category);
            System.out.println("key: " + key);
            System.out.println("startTime: " + startTime);
            System.out.println("endTime: " + endTime);
            System.out.println("order: " + order);
            System.out.println("text: " + text);
            System.out.println("page: " + page);
            System.out.println("size: " + size);
            System.out.println("-----------------------------------");
            List<LeaderboardTrackDTO> leaderboardTrackDTOS = leaderboardService.fetchLeaderboardWithFilter(
                category,
                key,
                startTime,
                endTime,
                order,
                text,
                page,
                size
            );
            resp = new ResponseUtils().put("leaderboard", leaderboardTrackDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
