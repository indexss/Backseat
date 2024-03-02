package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import team.bham.service.dto.SpotifyConnectionDTO;

import java.time.Instant;

import static team.bham.spotify.SpotifyCredential.SYSTEM;

public class ClientCredentialsResponse {
    @JsonProperty("access_token")
    public String accessToken;
    @JsonProperty("token_type")
    public String tokenType; // should always be "bearer"
    @JsonProperty("expires_in")
    public int expiresInSeconds;

    public SpotifyConnectionDTO asSpotifyConnectionDTO() {
        SpotifyConnectionDTO dto = new SpotifyConnectionDTO();
        dto.setSpotifyURI(SYSTEM);
        dto.setAccessToken(this.accessToken);
        dto.setAccessTokenExpiresAt(Instant.now().plusSeconds(this.expiresInSeconds));
        return dto;
    }
}
