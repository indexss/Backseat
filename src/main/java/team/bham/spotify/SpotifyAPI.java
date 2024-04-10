package team.bham.spotify;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import team.bham.spotify.responses.APIErrorResponse;
import team.bham.spotify.responses.TrackResponse;
import team.bham.spotify.responses.UserProfileResponse;

public class SpotifyAPI {

    private final Logger log = LoggerFactory.getLogger(SpotifyAPI.class);
    AccessTokenProvider tokenProvider;

    public SpotifyAPI(AccessTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    protected static HttpClient newHttpClient() {
        return HttpClient.newHttpClient();
    }

    protected static HttpResponse<String> doHttpRequest(HttpRequest req) throws IOException, InterruptedException {
        HttpResponse<String> resp = SpotifyAPI.newHttpClient().send(req, HttpResponse.BodyHandlers.ofString());
        //System.err.printf("REQ %s (%d)\n", resp.uri(), resp.statusCode());
        return resp;
    }

    protected static URI formUri(String path) {
        return URI.create("https://api.spotify.com/v1" + path);
    }

    private HttpRequest.Builder getAuthenticatedRequestBuilder() throws SpotifyException, IOException, InterruptedException {
        return HttpRequest.newBuilder().header("Authorization", tokenProvider.getAccessToken());
    }

    public UserProfileResponse getCurrentUserProfile() throws SpotifyException, IOException, InterruptedException {
        HttpResponse<String> resp = doHttpRequest(getAuthenticatedRequestBuilder().uri(formUri("/me")).build());

        if (resp.statusCode() != 200) {
            APIErrorResponse res = Util.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        return Util.unmarshalJson(resp.body(), UserProfileResponse.class);
    }

    public TrackResponse[] getRecentTracks() throws IOException, SpotifyException, InterruptedException {
        HttpResponse<String> resp = doHttpRequest(getAuthenticatedRequestBuilder().uri(formUri("/me/player/recently-played")).build());
        System.err.println(resp.body());

        if (resp.statusCode() != 200) {
            APIErrorResponse res = Util.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        //log.debug("####################################", resp);
        return Util.unmarshalJson(resp.body(), TrackResponse[].class);
    }

    public TrackResponse getTrack(String id) throws IOException, SpotifyException, InterruptedException {
        return getTrack(id, null);
    }

    public TrackResponse getTrack(String id, String market) throws IOException, SpotifyException, InterruptedException {
        String pathString = "/tracks/".concat(id);

        if (market != null) {
            HashMap<String, String> params = new HashMap<>();
            params.put("market", market);
            pathString = pathString.concat("?" + Util.createUrlEncodedString(params));
        }

        HttpResponse<String> resp = doHttpRequest(getAuthenticatedRequestBuilder().uri(formUri(pathString)).build());

        System.err.println(resp.body());

        if (resp.statusCode() != 200) {
            APIErrorResponse res = Util.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        return Util.unmarshalJson(resp.body(), TrackResponse.class);
    }
}
