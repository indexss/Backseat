package team.bham.web.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.bham.config.ApplicationProperties;
import team.bham.service.SpotifyConnectionService;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.responses.SearchResponse;

import java.io.IOException;

@RestController
@RequestMapping("/api/search")
public class SearchResource {

    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;


    public SearchResource(ApplicationProperties appProps, SpotifyConnectionService spotifyConnectionService) {
        this.appProps = appProps;
        this.spotifyConnectionService = spotifyConnectionService;
    }

    @GetMapping("/do")
    public SearchResponse doSearch(@RequestParam("q") String query) throws SpotifyException, IOException, InterruptedException {
        return new SpotifyAPI(
            new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM)
        ).search(query);
    }
}
