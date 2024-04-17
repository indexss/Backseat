package team.bham.web.rest;

import java.io.IOException;
import java.util.Optional;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.web.bind.annotation.*;
import team.bham.config.ApplicationProperties;
import team.bham.service.AlbumService;
import team.bham.service.ArtistService;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.TrackService;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ArtistDTO;
import team.bham.service.dto.TrackDTO;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.SpotifyUtil;
import team.bham.spotify.responses.ArtistResponse;
import team.bham.spotify.responses.SearchResponse;
import team.bham.spotify.responses.TrackResponse;

@RestController
@RequestMapping("/api/datapipe")
public class SearchResource {

    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;
    private final ArtistService artistService;
    private final AlbumService albumService;
    private final TrackService trackService;

    public SearchResource(
        ApplicationProperties appProps,
        SpotifyConnectionService spotifyConnectionService,
        ArtistService artistService,
        AlbumService albumService,
        TrackService trackService
    ) {
        this.appProps = appProps;
        this.spotifyConnectionService = spotifyConnectionService;
        this.artistService = artistService;
        this.albumService = albumService;
        this.trackService = trackService;
    }

    @GetMapping("/search")
    public SearchResponse doSearch(@RequestParam("q") String query) throws SpotifyException, IOException, InterruptedException {
        return new SpotifyAPI(new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM)).search(query);
    }

    @PostMapping("/import/{trackURI}")
    public boolean doImport(@PathVariable String trackURI) throws IOException, InterruptedException {
        TrackResponse track;
        try {
            track =
                new SpotifyAPI(new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM))
                    .getTrack(SpotifyUtil.getIdFromUri(trackURI));
        } catch (SpotifyException e) {
            // I'm assuming that this is a not found error, but if the import fails for some other unrelated reason
            // then it's still the same net result, ie. track cannot be found, give up.
            return false;
        }

        // Ensure every artist exists
        for (ArtistResponse a : ArrayUtils.addAll(track.artists, track.album.artists)) {
            Optional<ArtistDTO> ao = this.artistService.findOne(a.uri);
            if (ao.isEmpty()) {
                this.artistService.save(a.asDTO());
                ArtistDTO adto = new ArtistDTO();
            }
        }

        // Ensure album exists
        {
            Optional<AlbumDTO> ao = this.albumService.findOne(track.album.uri);
            if (ao.isEmpty()) {
                this.albumService.save(track.album.asDTO());
            }
        }

        // Ensure track exists
        Optional<TrackDTO> to = this.trackService.findOne(track.uri);
        if (to.isEmpty()) {
            this.trackService.save(track.asDTO());
        }

        return true;
    }
}
