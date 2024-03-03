package team.bham.spotify;

import org.springframework.http.HttpHeaders;
import team.bham.config.ApplicationProperties;
import team.bham.service.SpotifyConnectionService;
import team.bham.spotify.responses.AccessTokenResponse;
import team.bham.spotify.responses.AuthenticationErrorResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;

public class SpotifyOAuth {

    public final static String SCOPES = "user-read-recently-played";

    private final ApplicationProperties appProps;
    private final SpotifyConnectionService spotifyConnectionService;

    public SpotifyOAuth(ApplicationProperties appProps, SpotifyConnectionService serv) {
        this.appProps = appProps;
        this.spotifyConnectionService = serv;
    }

    public static String generateState() {
        byte[] rawState = new byte[32];
        new SecureRandom().nextBytes(rawState);
        return Util.bytesToHexString(rawState);
    }

    private static String generateInboundOauthUrl(HttpServletRequest request) {
        return request.getProtocol().split("/")[0].toLowerCase() + "://" + request.getHeader(HttpHeaders.HOST) + "/oauth/inbound";
    }

    public String generateOauthRedirectUrl(String state, HttpServletRequest request) {
        HashMap<String, String> params = new HashMap<>();
        params.put("response_type", "code");
        params.put("client_id", this.appProps.getSpotifyClientId());
        params.put("scope", SCOPES);
        params.put("redirect_uri", generateInboundOauthUrl(request));
        params.put("state", state);

        return "https://accounts.spotify.com/authorize?" + Util.createUrlEncodedString(params);
    }

    public AccessTokenResponse performTokenExchange(HttpServletRequest request, String code) throws IOException, InterruptedException, SpotifyException {
        HashMap<String, String> params = new HashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("code", code);
        params.put("redirect_uri", generateInboundOauthUrl(request));

        HttpResponse<String> resp = SpotifyAPI.doHttpRequest(
            HttpRequest.newBuilder()
                .uri(URI.create("https://accounts.spotify.com/api/token"))
                .POST(HttpRequest.BodyPublishers.ofString(Util.createUrlEncodedString(params)))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Authorization", "Basic " + Base64.getEncoder().encodeToString(
                    (this.appProps.getSpotifyClientId() + ":" + this.appProps.getSpotifyClientSecret()).getBytes()
                )).build()
        );

        if (resp.statusCode() != 200) {
            AuthenticationErrorResponse err = Util.unmarshalJson(resp.body(), AuthenticationErrorResponse.class);
            throw new SpotifyException("unable to obtain Spotify access token", err.error);
        }

        return Util.unmarshalJson(resp.body(), AccessTokenResponse.class);
    }
}
