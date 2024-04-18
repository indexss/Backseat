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
import team.bham.spotify.responses.APIErrorResponse;
import team.bham.spotify.responses.SearchResponse;
import team.bham.spotify.responses.TrackResponse;
import team.bham.spotify.responses.UserProfileResponse;

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

    public SearchResponse search(String query) throws SpotifyException, IOException, InterruptedException {
        // TODO(txp271): add toggle for search type?
        String pathString = "/search";

        HashMap<String, String> params = new HashMap<>();
        params.put("query", query);
        params.put("type", "track");
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

    public String createPlaylist() throws SpotifyException, IOException, InterruptedException, JSONException {
        UserProfileResponse currentUser = getCurrentUserProfile();

        System.out.println("******************************************************");
        System.out.println("*************CurrentUser: " + currentUser);
        System.out.println("******************************************************");

        String pathString = "/users/".concat(currentUser.id).concat("/playlists");

        //make HttpRequestBody
        String body =
            "{\n" +
            "    \"name\": \"Want-To-Listen List\",\n" +
            "    \"description\": \"Created by Backseat\",\n" +
            "    \"public\": false,\n" +
            "    \"collaborative\": false\n" +
            "}";

        //make HttpRequest
        HttpRequest.Builder builder = getAuthenticatedRequestBuilder()
            .uri(formUri(pathString))
            .POST(HttpRequest.BodyPublishers.ofString(body));
        HttpResponse<String> resp = doHttpRequest(builder.build());

        if (resp.statusCode() != 201) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class); // TODO: 403 ERROR
            throw res.toException();
        }

        //get playlist ID, return ID
        String temp = resp.body().substring(resp.body().indexOf("\"id\":"));
        return temp.split("\"", 5)[3];
    }

    public void addWantToListenEntriesToPlaylist(List<WantToListenListItem> itemList, String playlistId)
        throws JSONException, SpotifyException, IOException, InterruptedException {
        String pathString = "/playlists/" + playlistId + "/tracks";
        List<String> uriList = new ArrayList<>();
        for (WantToListenListItem item : itemList) {
            uriList.add(item.getItemUri());
            if (uriList.size() >= 100) { // spotify api only accept 100 uris in one request
                System.out.println("************More than 100 items in playlist, add first 100 items to playlist****************");
                break;
            }
        }
        String uris = "\"" + uriList.get(0) + "\"";
        if (uriList.size() > 1) {
            for (int i = 1; i < uriList.size(); i++) {
                uris = uris.concat(",\"").concat(uriList.get(i)).concat("\"");
            }
        }
        String body = "{\n" + "   \"uris\": [" + uris + "],\n" + "   \"position\": 0\n" + "}";
        System.out.println("********************" + body);
        HttpResponse<String> resp = doHttpRequest(
            getAuthenticatedRequestBuilder().uri(formUri(pathString)).POST(HttpRequest.BodyPublishers.ofString(body)).build()
        );
        if (resp.statusCode() != 200) {
            APIErrorResponse res = SpotifyUtil.unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }
        System.out.println("********************Add complete!");
    }
}
