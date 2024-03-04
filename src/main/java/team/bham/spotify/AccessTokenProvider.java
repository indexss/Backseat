package team.bham.spotify;

import java.io.IOException;

public interface AccessTokenProvider {
    String getAccessToken() throws IOException, InterruptedException, SpotifyException;
}
