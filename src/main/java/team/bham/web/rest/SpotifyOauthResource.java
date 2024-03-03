package team.bham.web.rest;

import java.io.IOException;
import javax.servlet.http.Cookie;
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
import team.bham.repository.SpotifyConnectionRepository;
import team.bham.service.SpotifyConnectionService;
import team.bham.spotify.*;
import team.bham.spotify.responses.AccessTokenResponse;
import team.bham.spotify.responses.UserProfileResponse;

@RestController
@RequestMapping("/api/oauth")
public class SpotifyOauthResource {

    public final static String STATE_COOKIE = "backseat-oauth-state";

    private final Logger log = LoggerFactory.getLogger(SpotifyOauthResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private ApplicationProperties appProps;

    private final SpotifyConnectionService spotifyConnectionService;

    public SpotifyOauthResource(
        SpotifyConnectionService spotifyConnectionService
    ) {
        this.spotifyConnectionService = spotifyConnectionService;
    }

    public class GetUrlResponse {
        public String url;
    }

    @GetMapping("/get-url")
    public GetUrlResponse getUrl(HttpServletRequest request, HttpServletResponse response) {
        String state = SpotifyOAuth.generateState();

        Cookie stateCookie = new Cookie(STATE_COOKIE, state);
        stateCookie.setHttpOnly(true);
        response.addCookie(stateCookie);

        GetUrlResponse resp = new GetUrlResponse();
        resp.url = new SpotifyOAuth(this.appProps, this.spotifyConnectionService)
            .generateOauthRedirectUrl(state, request);
        return resp;
    }

    public static class StoreResultRequest {
        @NotNull
        public String code;
        @NotNull
        public String state;
    }

    @PostMapping("/store-result")
    public ResponseEntity<String> storeResult(HttpServletRequest request, @Valid @RequestBody SpotifyOauthResource.StoreResultRequest body) throws IOException, InterruptedException {
        // Verify state
        Cookie stateCookie = null;
        for (Cookie c : request.getCookies()) {
            if (STATE_COOKIE.equals(c.getName())) {
                stateCookie = c;
                break;
            }
        }

        if (stateCookie == null) {
            return new ResponseEntity<>("Missing state", HttpStatus.BAD_REQUEST);
        }

        if (!body.state.equals(stateCookie.getValue())) {
            return new ResponseEntity<>("Invalid state", HttpStatus.BAD_REQUEST);
        }

        // Do token exchange
        AccessTokenResponse accessToken;
        try {
            accessToken = new SpotifyOAuth(this.appProps, this.spotifyConnectionService)
                .performTokenExchange(request, body.code);
        } catch (SpotifyException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "unable to perform token exchange", e);
        }

        // Get corresponding user URI
        UserProfileResponse userProfile;
        try {
            userProfile = new SpotifyAPI(
                new SpotifyPlainCredential(accessToken.accessToken)
            ).getCurrentUserProfile();
        } catch (SpotifyException e) {
            throw e.toResponseStatusException();
        }

        // Store result
        this.spotifyConnectionService.update(accessToken.asSpotifyConnectionDTO(userProfile.uri));
        // TODO(txp271): link this SpotifyConnection to Profile
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
