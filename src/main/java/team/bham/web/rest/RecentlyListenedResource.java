package team.bham.web.rest;

import java.io.IOException;
import org.springframework.web.bind.annotation.*;
import team.bham.config.ApplicationProperties;
import team.bham.service.SpotifyConnectionService;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.responses.TrackResponse;

@RestController
@RequestMapping("/api/discover")
public class RecentlyListenedResource {

    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;

    public RecentlyListenedResource(ApplicationProperties appProps, SpotifyConnectionService spotifyConnectionService)
        throws java.io.IOException {
        this.spotifyConnectionService = spotifyConnectionService;
        this.appProps = appProps;
    }

    @GetMapping("/track")
    public TrackResponse getTrack() throws IOException, InterruptedException, SpotifyException {
        SpotifyAPI client = new SpotifyAPI(new SpotifyCredential(appProps, spotifyConnectionService, "spotify:user:josiemp169"));
        TrackResponse resp = client.getTrack("4QVB1ZS4a15oz6md6YiSZV");
        return resp;
    }
}
