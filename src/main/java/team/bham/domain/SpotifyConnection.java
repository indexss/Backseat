package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.domain.Persistable;

/**
 * A SpotifyConnection.
 */
@JsonIgnoreProperties(value = { "new" })
@Entity
@Table(name = "spotify_connection")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpotifyConnection implements Serializable, Persistable<String> {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Id
    @Column(name = "spotify_uri", nullable = false)
    private String spotifyURI;

    @Column(name = "refresh_token")
    private String refreshToken;

    @NotNull
    @Column(name = "access_token", nullable = false)
    private String accessToken;

    @NotNull
    @Column(name = "access_token_expires_at", nullable = false)
    private Instant accessTokenExpiresAt;

    @Transient
    private boolean isPersisted;

    @JsonIgnoreProperties(value = { "user", "spotifyConnection", "folders", "reviews" }, allowSetters = true)
    @OneToOne(mappedBy = "spotifyConnection")
    private Profile profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public SpotifyConnection spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }

    public SpotifyConnection refreshToken(String refreshToken) {
        this.setRefreshToken(refreshToken);
        return this;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return this.accessToken;
    }

    public SpotifyConnection accessToken(String accessToken) {
        this.setAccessToken(accessToken);
        return this;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Instant getAccessTokenExpiresAt() {
        return this.accessTokenExpiresAt;
    }

    public SpotifyConnection accessTokenExpiresAt(Instant accessTokenExpiresAt) {
        this.setAccessTokenExpiresAt(accessTokenExpiresAt);
        return this;
    }

    public void setAccessTokenExpiresAt(Instant accessTokenExpiresAt) {
        this.accessTokenExpiresAt = accessTokenExpiresAt;
    }

    @Override
    public String getId() {
        return this.spotifyURI;
    }

    @Transient
    @Override
    public boolean isNew() {
        return !this.isPersisted;
    }

    public SpotifyConnection setIsPersisted() {
        this.isPersisted = true;
        return this;
    }

    @PostLoad
    @PostPersist
    public void updateEntityState() {
        this.setIsPersisted();
    }

    public Profile getProfile() {
        return this.profile;
    }

    public void setProfile(Profile profile) {
        if (this.profile != null) {
            this.profile.setSpotifyConnection(null);
        }
        if (profile != null) {
            profile.setSpotifyConnection(this);
        }
        this.profile = profile;
    }

    public SpotifyConnection profile(Profile profile) {
        this.setProfile(profile);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpotifyConnection)) {
            return false;
        }
        return spotifyURI != null && spotifyURI.equals(((SpotifyConnection) o).spotifyURI);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpotifyConnection{" +
            "spotifyURI=" + getSpotifyURI() +
            ", refreshToken='" + getRefreshToken() + "'" +
            ", accessToken='" + getAccessToken() + "'" +
            ", accessTokenExpiresAt='" + getAccessTokenExpiresAt() + "'" +
            "}";
    }
}
