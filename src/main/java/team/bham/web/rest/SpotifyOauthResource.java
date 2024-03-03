package team.bham.web.rest;

import java.io.IOException;
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
        GetUrlResponse resp = new GetUrlResponse();
        resp.url = new SpotifyOauth(this.appProps, this.spotifyConnectionService)
            .generateOauthRedirectUrl(SpotifyOauth.generateState(request), request);
        return resp;
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
    @PostMapping("/store-result")
    public ResponseEntity<StoreResultResponse> storeResult(HttpServletRequest request, @Valid @RequestBody SpotifyOauthResource.StoreResultRequest body) throws IOException, InterruptedException {
        // Verify state
        String state = SpotifyOauth.generateState(request);

        if (!body.state.equals(state)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid state");
        }

        // Do token exchange
        AccessTokenResponse accessToken;
        try {
            accessToken = new SpotifyOauth(this.appProps, this.spotifyConnectionService)
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

        StoreResultResponse resp = new StoreResultResponse();
        resp.displayName = userProfile.displayName;
        return new ResponseEntity<>(resp, HttpStatus.NO_CONTENT);
    }

}
