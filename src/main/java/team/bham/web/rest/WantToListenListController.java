package team.bham.web.rest;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import team.bham.config.ApplicationProperties;
import team.bham.domain.Profile;
import team.bham.repository.ProfileRepository;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.WantToListenListService;
import team.bham.service.dto.WantToListenListItem;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.utils.ResponseUtils;

@RestController
@RequestMapping("/api/want-to-listen-list")
public class WantToListenListController {

    @Resource
    private WantToListenListService wantListService;

    @Resource
    private SpotifyConnectionService spotifyConnService;

    @Resource
    private ApplicationProperties appProps;

    @Resource
    private ProfileRepository profileRepo;

    @GetMapping("/user")
    public ResponseUtils fetchEntriesByUser(@RequestParam String userID) {
        ResponseUtils resp;
        try {
            List<WantToListenListItem> itemList = wantListService.fetchUserWantToListenList(userID);
            resp = new ResponseUtils().put("entryList", itemList);
            System.out.println("**********************ItemList: " + itemList);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }
        return resp;
    }

    @GetMapping("/create-list")
    public ResponseUtils createWantToListenList(@RequestParam String userName) {
        ResponseUtils resp;
        Profile profile = profileRepo.findByUserLogin(userName).get();
        System.out.println("********************************profile: " + profile);
        SpotifyAPI api = new SpotifyAPI(new SpotifyCredential(appProps, spotifyConnService, profile.getSpotifyURI()));
        try {
            List<WantToListenListItem> itemList = wantListService.fetchUserWantToListenList(userName);
            String playListId = api.createPlaylist().id;
            System.out.println("*************************PlayList ID: " + playListId);

            api.addWantToListenEntriesToPlaylist(itemList, playListId);

            resp = new ResponseUtils().put("playlistId", playListId);
        } catch (Exception e) {
            e.printStackTrace();
            resp = new ResponseUtils(e.getClass().getSimpleName(), e.getMessage());
        }

        return resp;
    }
}
