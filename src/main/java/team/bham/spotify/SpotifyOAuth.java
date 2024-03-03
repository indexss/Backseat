package team.bham.spotify;

import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;

public class SpotifyOAuth {

    public final static String STATE_COOKIE = "backseat-oauth-state";

    public static String generateState() {
        byte[] rawState = new byte[32];
        new SecureRandom().nextBytes(rawState);
        return Util.bytesToHexString(rawState);
    }

    public static String generateOauthRedirectUrl(String clientId, String state, HttpServletRequest request) {
        String host = request.getHeader(HttpHeaders.HOST);

        HashMap<String, String> params = new HashMap<>();
        params.put("response_type", "code");
        params.put("client_id", clientId);
        params.put("scope", "user-read-recently-played");
        params.put("redirect_uri", request.getProtocol().split("/")[0].toLowerCase() + "://" + host + "/api/oauth/callback");
        params.put("state", state);

        return "https://accounts.spotify.com/authorize?" + Util.createUrlEncodedString(params);
    }
}
