package team.bham.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.Profile} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProfileDTO implements Serializable {

    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String spotifyURI;

    @Lob
    private byte[] profilePhoto;

    private String profilePhotoContentType;
    private UserDTO user;

    private SpotifyConnectionDTO spotifyConnection;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSpotifyURI() {
        return spotifyURI;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public byte[] getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(byte[] profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getProfilePhotoContentType() {
        return profilePhotoContentType;
    }

    public void setProfilePhotoContentType(String profilePhotoContentType) {
        this.profilePhotoContentType = profilePhotoContentType;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public SpotifyConnectionDTO getSpotifyConnection() {
        return spotifyConnection;
    }

    public void setSpotifyConnection(SpotifyConnectionDTO spotifyConnection) {
        this.spotifyConnection = spotifyConnection;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfileDTO)) {
            return false;
        }

        ProfileDTO profileDTO = (ProfileDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, profileDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfileDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", profilePhoto='" + getProfilePhoto() + "'" +
            ", user=" + getUser() +
            ", spotifyConnection=" + getSpotifyConnection() +
            "}";
    }
}
