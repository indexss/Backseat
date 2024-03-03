package team.bham.spotify;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.stream.Collectors;

class Util {
    protected static String createUrlEncodedString(HashMap<String, String> params) {
        return params.keySet().stream()
            .map(key -> key + "=" + URLEncoder.encode(params.get(key), StandardCharsets.UTF_8))
            .collect(Collectors.joining("&"));
    }

    protected static String bytesToHexString(byte[] data) {
        StringBuilder hexString = new StringBuilder(2 * data.length);
        for (int i = 0; i < data.length; i++) {
            String hex = Integer.toHexString(0xff & data[i]);
            if(hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
