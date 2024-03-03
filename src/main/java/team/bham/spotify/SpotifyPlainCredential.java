package team.bham.spotify;

import java.io.IOException;

public class SpotifyPlainCredential implements AccessTokenProvider {
    String token;
    public SpotifyPlainCredential(String bearerToken) {
        this.token = bearerToken;
    }

    @Override
    public String getAccessToken() throws IOException, InterruptedException, SpotifyException {
        return "Bearer " + this.token;
    }
}
