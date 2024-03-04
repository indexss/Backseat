package team.bham.spotify;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.Base64;
import java.util.HashMap;
import java.util.NoSuchElementException;
import java.util.Optional;
import team.bham.config.ApplicationProperties;
import team.bham.service.SpotifyConnectionService;
import team.bham.service.dto.SpotifyConnectionDTO;
import team.bham.spotify.responses.AccessTokenResponse;
import team.bham.spotify.responses.AuthenticationErrorResponse;
import team.bham.spotify.responses.ClientCredentialsResponse;

// TODO(txp271): It might be useful to have a mechanism in here to mark a token as invalid so that it is always
//  refreshed, eg: in the instance a password is changed and a new token is required.

public class SpotifyCredential {

    // SYSTEM represents authentication with client credentials (ie. not as a user)
    public static final String SYSTEM = "SYSTEM";

    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;
    private final String uri;

    private SpotifyConnectionDTO connDto;

    public SpotifyCredential(ApplicationProperties appProps, SpotifyConnectionService serv, String uri) {
        this.appProps = appProps;
        this.spotifyConnectionService = serv;
        this.uri = uri;
    }

    public boolean isSystem() {
        return SYSTEM.equals(this.uri);
    }

    private void fetchDTO() throws NoSuchElementException, IOException, InterruptedException, SpotifyException {
        Optional<SpotifyConnectionDTO> odto = spotifyConnectionService.findOne(uri);

        if (isSystem() && odto.isEmpty()) {
            // Working as the system user but there's no token recorded yet, so we need to fetch it.
            refreshAndStoreToken();
            return; // the above method sets connDto
        }

        this.connDto = odto.orElseThrow();
    }

    private void refreshAndStoreToken() throws IOException, InterruptedException, SpotifyException {
        HashMap<String, String> params = new HashMap<>();

        if (isSystem()) {
            params.put("grant_type", "client_credentials");
        } else {
            params.put("grant_type", "refresh_token");
            params.put("refresh_token", connDto.getRefreshToken());
        }

        HttpResponse<String> resp = SpotifyAPI.doHttpRequest(
            HttpRequest
                .newBuilder()
                .uri(URI.create("https://accounts.spotify.com/api/token"))
                .POST(HttpRequest.BodyPublishers.ofString(Util.createUrlEncodedString(params)))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header(
                    "Authorization",
                    "Basic " +
                    Base64.getEncoder().encodeToString((appProps.getSpotifyClientId() + ":" + appProps.getSpotifyClientSecret()).getBytes())
                )
                .build()
        );

        if (resp.statusCode() != 200) {
            // TODO(txp271): what does this look like when we have a 401 or 403 or for whatever reason the refresh token is bad?
            AuthenticationErrorResponse err = Util.unmarshalJson(resp.body(), AuthenticationErrorResponse.class);
            throw new SpotifyException("unable to refresh Spotify access token", err.error);
        }

        SpotifyConnectionDTO newDto;

        if (isSystem()) {
            newDto = Util.unmarshalJson(resp.body(), ClientCredentialsResponse.class).asSpotifyConnectionDTO();
        } else {
            newDto = Util.unmarshalJson(resp.body(), AccessTokenResponse.class).asSpotifyConnectionDTO(this.uri);
        }

        spotifyConnectionService.update(newDto);
        this.connDto = newDto;
    }

    public String getAccessToken() throws IOException, InterruptedException, SpotifyException {
        if (connDto == null) {
            // TODO(txp271): handle NoSuchElementException?
            //  Can occur when the UID is set to a user (ie. an authorization code flow will happen) but the
            //  corresponding SpotifyConnection cannot be found in the entity. This can only happen if there's a bug
            //  somewhere else in the system that allows that to be deleted or allows a requst without a Spotify login
            //  through so probably(??) not needed.
            fetchDTO();
        }

        if (connDto.getAccessTokenExpiresAt().isBefore(Instant.now())) {
            // token has expired - we need to refresh
            refreshAndStoreToken();
        }

        return "Bearer " + connDto.getAccessToken();
    }
}
