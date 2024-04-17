package team.bham.web.rest;

import org.springframework.web.bind.annotation.*;
import team.bham.config.ApplicationProperties;
import team.bham.service.SpotifyConnectionService;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.SpotifyUtil;
import team.bham.spotify.responses.SearchResponse;
import team.bham.spotify.responses.TrackResponse;

import java.io.IOException;

@RestController
@RequestMapping("/api/datapipe")
public class SearchResource {

    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;


    public SearchResource(ApplicationProperties appProps, SpotifyConnectionService spotifyConnectionService) {
        this.appProps = appProps;
        this.spotifyConnectionService = spotifyConnectionService;
    }

    @GetMapping("/search")
    public SearchResponse doSearch(@RequestParam("q") String query) throws SpotifyException, IOException, InterruptedException {
        return new SpotifyAPI(
            new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM)
        ).search(query);
    }

    @PostMapping("/import/{trackURI}")
    public boolean doImport(@PathVariable String trackURI) throws IOException, InterruptedException {
        TrackResponse track;
        try {
            track = new SpotifyAPI(
                new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM)
            ).getTrack(SpotifyUtil.getIdFromUri(trackURI));

            // TODO(txp271): implement imports
        } catch (SpotifyException e) {
            // I'm assuming that this is a not found error, but if the import fails for some other unrelated reason
            // then it's still the same net result, ie. track cannot be found, give up.
            return false;
        }
        return false;
    }
}
