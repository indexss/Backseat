package team.bham.spotify;

import io.micrometer.core.instrument.search.Search;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import team.bham.service.dto.WantToListenListItem;
import team.bham.spotify.responses.*;

public class SpotifyAPI {

    AccessTokenProvider tokenProvider;

    public SpotifyAPI(AccessTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    protected static HttpClient newHttpClient() {
        return HttpClient.newHttpClient();
    }

    protected static HttpResponse<String> doHttpRequest(HttpRequest req) throws IOException, InterruptedException {
        HttpResponse<String> resp = SpotifyAPI.newHttpClient().send(req, HttpResponse.BodyHandlers.ofString());
        System.err.printf("REQ %s (%d)\n", resp.uri(), resp.statusCode());
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
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        return SpotifyUtil.unmarshalJson(resp.body(), UserProfileResponse.class);
    }

    public UserProfileResponse getUser(String id) throws IOException, SpotifyException, InterruptedException {
        String pathString = "/users/".concat(id);
        HttpResponse<String> resp = doHttpRequest(getAuthenticatedRequestBuilder().uri(formUri(pathString)).build());
        System.err.printf("%d %s\n", resp.statusCode(), resp.body());
        if (resp.statusCode() != 200) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }
        return SpotifyUtil.unmarshalJson(resp.body(), UserProfileResponse.class);
    }

    public TrackResponse getTrack(String id) throws IOException, SpotifyException, InterruptedException {
        return getTrack(id, null);
    }

    public TrackResponse getTrack(String id, String market) throws IOException, SpotifyException, InterruptedException {
        String pathString = "/tracks/".concat(id);

        if (market != null) {
            HashMap<String, String> params = new HashMap<>();
            params.put("market", market);
            pathString = pathString.concat("?" + SpotifyUtil.createUrlEncodedString(params));
        }

        HttpResponse<String> resp = doHttpRequest(getAuthenticatedRequestBuilder().uri(formUri(pathString)).build());

        System.err.println(resp.body());

        if (resp.statusCode() != 200) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        return SpotifyUtil.unmarshalJson(resp.body(), TrackResponse.class);
    }

    public SearchResponse search(String query, String type) throws SpotifyException, IOException, InterruptedException {
        // TODO(txp271): add toggle for search type?
        String pathString = "/search";

        HashMap<String, String> params = new HashMap<>();
        params.put("query", query);
        params.put("type", type);
        params.put("limit", "20");
        pathString = pathString.concat("?" + SpotifyUtil.createUrlEncodedString(params));

        HttpResponse<String> resp = doHttpRequest(getAuthenticatedRequestBuilder().uri(formUri(pathString)).build());

        System.err.println(resp.body());

        if (resp.statusCode() != 200) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        return SpotifyUtil.unmarshalJson(resp.body(), SearchResponse.class);
    }

    public PlaylistResponse createPlaylist() throws SpotifyException, IOException, InterruptedException {
        UserProfileResponse currentUser = getCurrentUserProfile();
        String pathString = "/users/".concat(currentUser.id).concat("/playlists");

        //make HttpRequestBody
        HashMap<String, Object> body = new HashMap<>();
        body.put("name", "Want-To-Listen List");
        body.put("description", "Created by Backseat");
        body.put("public", false);
        body.put("collaborative", false);

        //make HttpRequest
        HttpRequest.Builder builder = getAuthenticatedRequestBuilder()
            .uri(formUri(pathString))
            .POST(HttpRequest.BodyPublishers.ofString(SpotifyUtil.marshalJSON(body)));
        HttpResponse<String> resp = doHttpRequest(builder.build());

        if (resp.statusCode() != 201) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class); // TODO: 403 ERROR
            throw res.toException();
        }

        return SpotifyUtil.unmarshalJson(resp.body(), PlaylistResponse.class);
    }

    public void addWantToListenEntriesToPlaylist(List<WantToListenListItem> itemList, String playlistId) throws SpotifyException, IOException, InterruptedException {
        String pathString = "/playlists/" + playlistId + "/tracks";

        List<String> uriList = new ArrayList<>();
        for (WantToListenListItem item : itemList) {
            uriList.add(item.getItemUri());
            if (uriList.size() >= 100) { // spotify api only accept 100 uris in one request
                break;
            }
        }

        HashMap<String, Object> body = new HashMap<>();
        body.put("uris", uriList);
        body.put("position", 0);

        HttpResponse<String> resp = doHttpRequest(
            getAuthenticatedRequestBuilder().uri(formUri(pathString)).POST(HttpRequest.BodyPublishers.ofString(SpotifyUtil.marshalJSON(body))).build()
        );

        if (resp.statusCode() != 200) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }
    }
}
