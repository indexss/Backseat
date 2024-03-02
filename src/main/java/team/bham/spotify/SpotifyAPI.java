package team.bham.spotify;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.stream.Collectors;

public class SpotifyAPI {

    protected static HttpClient newHttpClient() {
        return HttpClient.newHttpClient();
    }

    protected static HttpResponse<String> doHttpRequest(HttpRequest req) throws IOException, InterruptedException {
        HttpResponse<String> resp = SpotifyAPI.newHttpClient().send(req, HttpResponse.BodyHandlers.ofString());
        System.err.printf("REQ %s (%d)\n", resp.uri(), resp.statusCode());
        return resp;
    }

    protected static String createUrlEncodedForm(HashMap<String, String> params) {
        return params.keySet().stream()
            .map(key -> key + "=" + URLEncoder.encode(params.get(key), StandardCharsets.UTF_8))
            .collect(Collectors.joining("&"));
    }

    protected static <T> T unmarshalJson(String data, Class<T> cl) throws JsonProcessingException {
        return new ObjectMapper().readValue(data, cl);
    }
}
