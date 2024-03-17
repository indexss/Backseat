package team.bham.spotify.responses;

import static team.bham.spotify.SpotifyCredential.SYSTEM;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
import team.bham.service.dto.SpotifyConnectionDTO;

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
