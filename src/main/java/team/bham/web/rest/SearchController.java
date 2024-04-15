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
import team.bham.utils.SearchUtils;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Resource
    private LeaderboardService leaderboardService;

    //fetch all album in data
    private String category = "album";
    private String key = "rating";
    private LocalDate startTime = LocalDate.of(2000, 1, 1);
    private LocalDate endTime = LocalDate.of(2033, 1, 1);
    private String text = "";
    private int page = 0;
    private int size = 10;
    private String order = "desc";

    @GetMapping("/")
    public SearchUtils fetchTrackLeaderboard() {
        SearchUtils resp = null;
        try {
            List<LeaderboardTrackDTO> leaderboardAlbumDTOS = leaderboardService.fetchLeaderboardWithFilter(
                category,
                key,
                startTime,
                endTime,
                order,
                text,
                page,
                size
            );
            System.out.println("!!!!!!!!!!!!!In Search Controller");
            System.out.println("Trying to fetch Album DTOs");
            System.out.println(leaderboardAlbumDTOS);
            List<LeaderboardTrackDTO> leaderboardTrackDTOS = leaderboardService.fetchTrackLeaderboard();
            resp = new SearchUtils().put("leaderboard", leaderboardTrackDTOS, "album", leaderboardAlbumDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new SearchUtils(e.getClass().getSimpleName(), e.getMessage(), e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
