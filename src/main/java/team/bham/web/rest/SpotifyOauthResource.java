package team.bham.web.rest;

import java.io.IOException;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import team.bham.config.ApplicationProperties;
import team.bham.domain.Profile;
import team.bham.domain.SpotifyConnection;
import team.bham.domain.User;
import team.bham.repository.ProfileRepository;
import team.bham.repository.SpotifyConnectionRepository;
import team.bham.repository.UserRepository;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.UserService;
import team.bham.service.dto.SpotifyConnectionDTO;
import team.bham.spotify.SpotifyAPI;
import team.bham.spotify.SpotifyException;
import team.bham.spotify.SpotifyOauth;
import team.bham.spotify.SpotifyPlainCredential;
import team.bham.spotify.responses.AccessTokenResponse;
import team.bham.spotify.responses.UserProfileResponse;

@RestController
@RequestMapping("/api/oauth")
public class SpotifyOauthResource {

    private final Logger log = LoggerFactory.getLogger(SpotifyOauthResource.class);
    private final SpotifyConnectionService spotifyConnectionService;
    private final SpotifyConnectionRepository spotifyConnectionRepository;

    @Autowired
    private ApplicationProperties appProps;

    private UserService userService;
    private UserRepository userRepository;
    private ProfileRepository profileRepository;

    public SpotifyOauthResource(
        SpotifyConnectionService spotifyConnectionService,
        SpotifyConnectionRepository spotifyConnectionRepository,
        UserService userService,
        UserRepository userRepository,
        ProfileRepository profileRepository
    ) {
        this.spotifyConnectionService = spotifyConnectionService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.spotifyConnectionRepository = spotifyConnectionRepository;
    }

    @GetMapping("/get-url")
    public GetUrlResponse getUrl(HttpServletRequest request, HttpServletResponse response) {
        GetUrlResponse resp = new GetUrlResponse();
        resp.url = new SpotifyOauth(this.appProps).generateOauthRedirectUrl(SpotifyOauth.generateState(request), request);
        return resp;
    }

    @PostMapping("/store-result")
    public ResponseEntity<StoreResultResponse> storeResult(
        HttpServletRequest request,
        @Valid @RequestBody SpotifyOauthResource.StoreResultRequest body
    ) throws IOException, InterruptedException {
        // Verify state
        String state = SpotifyOauth.generateState(request);

        if (!body.state.equals(state)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid state");
        }

        // Do token exchange
        AccessTokenResponse accessToken;
        try {
            accessToken = new SpotifyOauth(this.appProps).performTokenExchange(request, body.code);
        } catch (SpotifyException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "unable to perform token exchange", e);
        }

        // Get corresponding user URI
        UserProfileResponse userProfile;
        try {
            userProfile = new SpotifyAPI(new SpotifyPlainCredential(accessToken.accessToken)).getCurrentUserProfile();
        } catch (SpotifyException e) {
            throw e.toResponseStatusException();
        }

        // Store result
        SpotifyConnectionDTO conn = this.spotifyConnectionService.update(accessToken.asSpotifyConnectionDTO(userProfile.uri));
        Optional<User> u = userService.getUserWithAuthorities();
        if (u.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Profile prof = profileRepository.findByUserLogin(u.get().getLogin()).get();
        prof.setSpotifyURI(conn.getSpotifyURI());
        prof.setSpotifyConnection(new SpotifyConnection().spotifyURI(conn.getSpotifyURI()));
        profileRepository.save(prof);

        StoreResultResponse resp = new StoreResultResponse();
        resp.displayName = userProfile.displayName;
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    public static class StoreResultRequest {

        @NotNull
        public String code;

        @NotNull
        public String state;
    }

    public static class StoreResultResponse {

        public String displayName;
    }

    public class GetUrlResponse {

        public String url;
    }
}
