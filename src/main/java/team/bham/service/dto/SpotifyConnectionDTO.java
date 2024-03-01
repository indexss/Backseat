package team.bham.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.SpotifyConnection} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpotifyConnectionDTO implements Serializable {

    @NotNull
    private String spotifyURI;

    @NotNull
    private String refreshToken;

    @NotNull
    private String accessToken;

    @NotNull
    private Instant accessTokenExpiresAt;

    public String getSpotifyURI() {
        return spotifyURI;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Instant getAccessTokenExpiresAt() {
        return accessTokenExpiresAt;
    }

    public void setAccessTokenExpiresAt(Instant accessTokenExpiresAt) {
        this.accessTokenExpiresAt = accessTokenExpiresAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpotifyConnectionDTO)) {
            return false;
        }

        SpotifyConnectionDTO spotifyConnectionDTO = (SpotifyConnectionDTO) o;
        if (this.spotifyURI == null) {
            return false;
        }
        return Objects.equals(this.spotifyURI, spotifyConnectionDTO.spotifyURI);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.spotifyURI);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpotifyConnectionDTO{" +
            "spotifyURI='" + getSpotifyURI() + "'" +
            ", refreshToken='" + getRefreshToken() + "'" +
            ", accessToken='" + getAccessToken() + "'" +
            ", accessTokenExpiresAt='" + getAccessTokenExpiresAt() + "'" +
            "}";
    }
}
