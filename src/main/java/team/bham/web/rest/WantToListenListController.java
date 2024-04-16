package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import team.bham.domain.WantToListenListEntry;
import team.bham.service.WantToListenListEntryService;
import team.bham.service.WantToListenListService;
import team.bham.service.dto.WantToListenListItem;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/want-to-listen-list")
public class WantToListenListController {

    @Resource
    private WantToListenListService wantListService;

    @Resource
    private WantToListenListEntryService entryService;

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

    @GetMapping("/user")
    public ResponseUtils fetchEntriesByUser(@RequestParam String userID) {
        ResponseUtils resp;
        try {
            //new service to be testing!! TODO: GET api testing: 1. check 'artists'  2. check 'addTime'   3. check 'releaseDate'
            List<WantToListenListItem> itemList = wantListService.fetchUserWantToListenList(userID);
            resp = new ResponseUtils().put(userID, itemList);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
