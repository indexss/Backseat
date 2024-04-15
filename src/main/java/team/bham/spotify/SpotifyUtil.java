package team.bham.spotify;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.stream.Collectors;

public class SpotifyUtil {
    protected static String createUrlEncodedString(HashMap<String, String> params) {
        return params
            .keySet()
            .stream()
            .map(key -> key + "=" + URLEncoder.encode(params.get(key), StandardCharsets.UTF_8))
            .collect(Collectors.joining("&"));
    }

    protected static String bytesToHexString(byte[] data) {
        StringBuilder hexString = new StringBuilder(2 * data.length);
        for (byte b : data) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    protected static <T> T unmarshalJson(String data, Class<T> cl) throws JsonProcessingException {
        return new ObjectMapper().readValue(data, cl);
    }

    public static String getIdFromUri(String uri) {
        String[] sp = uri.split(":");
        return sp[sp.length - 1];
    }
}
