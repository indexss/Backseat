package team.bham.spotify;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import team.bham.spotify.responses.APIErrorResponse;
import team.bham.spotify.responses.AccessTokenResponse;
import team.bham.spotify.responses.UserProfileResponse;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SpotifyAPI {

    protected static HttpClient newHttpClient() {
        return HttpClient.newHttpClient();
    }

    protected static HttpResponse<String> doHttpRequest(HttpRequest req) throws IOException, InterruptedException {
        HttpResponse<String> resp = SpotifyAPI.newHttpClient().send(req, HttpResponse.BodyHandlers.ofString());
        System.err.printf("REQ %s (%d)\n", resp.uri(), resp.statusCode());
        return resp;
    }

    protected static <T> T unmarshalJson(String data, Class<T> cl) throws JsonProcessingException {
        return new ObjectMapper().readValue(data, cl);
    }

    protected static URI formUri(String path) {
        return URI.create("https://api.spotify.com/v1" + path);
    }

    private HttpRequest.Builder getAuthenticatedRequestBuilder() throws SpotifyException, IOException, InterruptedException {
        return HttpRequest.newBuilder().header("Authorization", tokenProvider.getAccessToken());
    }

    AccessTokenProvider tokenProvider;

    public SpotifyAPI(AccessTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    public UserProfileResponse getCurrentUserProfile() throws SpotifyException, IOException, InterruptedException {
        HttpResponse<String> resp = doHttpRequest(
            getAuthenticatedRequestBuilder()
                .uri(formUri("/me"))
                .build()
        );

        if (resp.statusCode() != 200) {
            APIErrorResponse res = unmarshalJson(resp.body(), APIErrorResponse.class);
            throw res.toException();
        }

        return unmarshalJson(resp.body(), UserProfileResponse.class);
    }
}
