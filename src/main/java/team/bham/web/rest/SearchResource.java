package team.bham.web.rest;

import io.micrometer.core.instrument.search.Search;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import team.bham.config.ApplicationProperties;
import team.bham.domain.Folder;
import team.bham.domain.Profile;
import team.bham.domain.User;
import team.bham.repository.FolderRepository;
import team.bham.repository.ProfileRepository;
import team.bham.service.*;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ArtistDTO;
import team.bham.service.dto.TrackDTO;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyCredential;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.SpotifyUtil;
import team.bham.spotify.responses.AlbumResponse;
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
    private final ProfileRepository profileRepository;
    private final FolderRepository folderRepository;
    private final UserService userService;

    public SearchResource(
        ApplicationProperties appProps,
        SpotifyConnectionService spotifyConnectionService,
        ArtistService artistService,
        AlbumService albumService,
        TrackService trackService,
        ProfileRepository profileRepository,
        FolderRepository folderRepository,
        UserService userService
    ) {
        this.appProps = appProps;
        this.spotifyConnectionService = spotifyConnectionService;
        this.artistService = artistService;
        this.albumService = albumService;
        this.trackService = trackService;
        this.profileRepository = profileRepository;
        this.folderRepository = folderRepository;
        this.userService = userService;
    }

    public class UnifiedSearchResults {

        SearchResponse.TrackBox tracks;
        SearchResponse.AlbumBox albums;
        List<Profile> users;
        List<Folder> folders;

        public SearchResponse.TrackBox getTracks() {
            return tracks;
        }

        public SearchResponse.AlbumBox getAlbums() {
            return albums;
        }

        public List<Profile> getUsers() {
            return users;
        }

        public List<Folder> getFolders() {
            return folders;
        }
    }

    @GetMapping("/search")
    public UnifiedSearchResults doSearch(@RequestParam("q") String query, @RequestParam("t") String searchType)
        throws SpotifyException, IOException, InterruptedException {
        if (!("track".equals(searchType) || "album".equals(searchType) || "user".equals(searchType) || "folder".equals(searchType))) {
            searchType = "track";
        }

        UnifiedSearchResults us = new UnifiedSearchResults();
        if ("track".equals(searchType) || "album".equals(searchType)) {
            // Select to search as SYSTEM or as the user if applicable so users get personalised results when logged in
            String userURI = SpotifyCredential.SYSTEM;

            Optional<User> ou = userService.getUserWithAuthorities();
            if (ou.isPresent()) {
                Optional<Profile> op = profileRepository.findByUserLogin(ou.get().getLogin());
                if (op.isPresent() && op.get().getSpotifyURI() != null) {
                    userURI = op.get().getSpotifyURI();
                }
            }

            SearchResponse results = new SpotifyAPI(
                //<<<<<<< HEAD
                //                // TODO(txp271): If user is logged in, use their Spotify credential so they get personalised search
                //                //  results
                //                new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM)
                //            )
                //                .search(query, searchType);
                //=======
                new SpotifyCredential(this.appProps, this.spotifyConnectionService, userURI)
            )
                .search(query, searchType);
            //

            us.tracks = results.tracks;
            us.albums = results.albums;
            return us;
        } else if ("user".equals(searchType)) {
            us.users = this.profileRepository.findAllByUsernameContaining(query);
        } else {
            us.folders = this.folderRepository.findAllByNameContaining(query);
        }

        return us;
    }

    @PostMapping("/import/{objectURI}")
    public boolean doImport(@PathVariable String objectURI) throws IOException, InterruptedException {
        String uriType = SpotifyUtil.getTypeFromUri(objectURI);

        if (uriType.equals("track")) {
            TrackResponse track;
            try {
                track =
                    new SpotifyAPI(new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM))
                        .getTrack(SpotifyUtil.getIdFromUri(objectURI));
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
        } else if (uriType.equals("album")) {
            AlbumResponse album;
            try {
                album =
                    new SpotifyAPI(new SpotifyCredential(this.appProps, this.spotifyConnectionService, SpotifyCredential.SYSTEM))
                        .getAlbum(SpotifyUtil.getIdFromUri(objectURI));
            } catch (SpotifyException e) {
                // I'm assuming that this is a not found error, but if the import fails for some other unrelated reason
                // then it's still the same net result, ie. track cannot be found, give up.
                return false;
            }

            // Ensure every artist exists
            for (ArtistResponse a : album.artists) {
                Optional<ArtistDTO> ao = this.artistService.findOne(a.uri);
                if (ao.isEmpty()) {
                    this.artistService.save(a.asDTO());
                }
            }

            // Ensure album exists
            {
                Optional<AlbumDTO> ao = this.albumService.findOne(album.uri);
                if (ao.isEmpty()) {
                    this.albumService.save(album.asDTO());
                }
            }

            return true;
        }

        return false;
    }
}
