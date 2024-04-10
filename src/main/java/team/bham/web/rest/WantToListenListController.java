package team.bham.web.rest;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import javax.annotation.Resource;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import team.bham.domain.WantToListenListEntry;
import team.bham.service.WantToListenListEntryService;
import team.bham.service.WantToListenListService;
import team.bham.service.dto.WantToListenListEntryDTO;
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

    @GetMapping("/post")
    public ResponseUtils addWantToListenListEntry(@RequestBody WantToListenListEntryDTO entryDTO) {
        System.out.println("**********************Get api want-to-listen/post request*************************");
        System.out.println("spotifyURI: " + entryDTO.getSpotifyURI());
        System.out.println("userID: " + entryDTO.getUserID());
        System.out.println("Add Time: " + entryDTO.getAddTime());
        System.out.println("**********************************************************************************");
        ResponseUtils resp;

        try {
            entryService.save(entryDTO);
            resp = new ResponseUtils().put("Adding Complete", entryDTO.getAddTime());
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }
}
