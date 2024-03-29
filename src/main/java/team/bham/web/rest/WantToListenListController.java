package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.bham.domain.WantToListenListEntry;
import team.bham.service.WantToListenListService;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/want-to-listen-list")
public class WantToListenListController {

    @Resource
    private WantToListenListService wantListService;

    @GetMapping("/all")
    public ResponseUtils fetchAllListEntries() {
        ResponseUtils resp;
        try {
            List<WantToListenListEntry> entryList = wantListService.fetchAllWantToListenList();
            resp = new ResponseUtils().put("all entries", entryList);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/test")
    public ResponseUtils fetchTestList() {
        ResponseUtils resp;
        try {
            String json =
                "[{" +
                "\"id\": 0," +
                "\"spotifyURI\": \"String\"," +
                "\"userID\": \"String\"," +
                "\"addTime\": \"2024-03-19T21:20:39.402Z\"" +
                "}]";
            resp = new ResponseUtils().put("test", json);
        } catch (Exception e) {
            System.out.println("Testing Error");
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
