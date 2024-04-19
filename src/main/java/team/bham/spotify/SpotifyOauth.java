package team.bham.spotify;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import team.bham.config.ApplicationProperties;
import team.bham.spotify.responses.AccessTokenResponse;
import team.bham.spotify.responses.AuthenticationErrorResponse;

public class SpotifyOauth {

    public static final String SCOPES =
        "user-read-recently-played playlist-modify-private playlist-read-private";

    private final ApplicationProperties appProps;

    public SpotifyOauth(ApplicationProperties appProps) {
        this.appProps = appProps;
    }

    public static String generateState(HttpServletRequest request) {
        byte[] rawState;

        try {
            rawState = MessageDigest.getInstance("SHA-256").digest(request.getHeader(HttpHeaders.AUTHORIZATION).getBytes());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        return SpotifyUtil.bytesToHexString(rawState);
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

        return "https://accounts.spotify.com/authorize?" + SpotifyUtil.createUrlEncodedString(params);
    }

    public AccessTokenResponse performTokenExchange(HttpServletRequest request, String code)
        throws IOException, InterruptedException, SpotifyException {
        HashMap<String, String> params = new HashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("code", code);
        params.put("redirect_uri", generateInboundOauthUrl(request));

        HttpResponse<String> resp = SpotifyAPI.doHttpRequest(
            HttpRequest
                .newBuilder()
                .uri(URI.create("https://accounts.spotify.com/api/token"))
                .POST(HttpRequest.BodyPublishers.ofString(SpotifyUtil.createUrlEncodedString(params)))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header(
                    "Authorization",
                    "Basic " +
                    Base64
                        .getEncoder()
                        .encodeToString((this.appProps.getSpotifyClientId() + ":" + this.appProps.getSpotifyClientSecret()).getBytes())
                )
                .build()
        );

        if (resp.statusCode() != 200) {
            AuthenticationErrorResponse err = SpotifyUtil.unmarshalJson(resp.body(), AuthenticationErrorResponse.class);
            throw new SpotifyException("unable to obtain Spotify access token: " + err.errorDescription, err.error);
        }

        return SpotifyUtil.unmarshalJson(resp.body(), AccessTokenResponse.class);
    }
}
