package team.bham.web.rest;

import java.io.IOException;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import team.bham.config.ApplicationProperties;
import team.bham.service.SpotifyConnectionService;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.responses.RecentListenedTrackResponse;

@RestController
@RequestMapping("/api/discover")
public class RecentlyListenedResource {

    private final Logger log = LoggerFactory.getLogger(RecentlyListenedResource.class);
    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;

    public RecentlyListenedResource(ApplicationProperties appProps, SpotifyConnectionService spotifyConnectionService)
        throws java.io.IOException {
        this.spotifyConnectionService = spotifyConnectionService;
        this.appProps = appProps;
    }

    @GetMapping("/recent")
    public RecentListenedTrackResponse getTrack() throws IOException, InterruptedException, SpotifyException {
        SpotifyAPI client = new SpotifyAPI(new SpotifyCredential(appProps, spotifyConnectionService, "spotify:user:josiemp169"));
        //TrackResponse resp[] = { client.getTrack("7FAFkQQZFeNwOFzTrSDFIh"), client.getTrack("1PJu7IPmGJZx5fAQeL4trB") };
        RecentListenedTrackResponse resp = client.getRecentTracks();

        return resp;
    }
}
