package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
import team.bham.service.dto.SpotifyConnectionDTO;

public class AccessTokenResponse {

    @JsonProperty("access_token")
    public String accessToken;

    @JsonProperty("token_type")
    public String tokenType; // should always be "bearer"

    @JsonProperty("scope")
    public String scope;

    @JsonProperty("expires_in")
    public int expiresInSeconds;

    @JsonProperty("refresh_token")
    public String refreshToken;

    public SpotifyConnectionDTO asSpotifyConnectionDTO(String uri) {
        SpotifyConnectionDTO dto = new SpotifyConnectionDTO();
        dto.setSpotifyURI(uri);
        dto.setAccessToken(this.accessToken);
        dto.setAccessTokenExpiresAt(Instant.now().plusSeconds(this.expiresInSeconds));
        dto.setRefreshToken(this.refreshToken);
        return dto;
    }
}
