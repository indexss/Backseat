package team.bham.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.Artist} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ArtistDTO implements Serializable {

    @NotNull
    private String spotifyURI;

    @NotNull
    private String name;

    public String getSpotifyURI() {
        return spotifyURI;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArtistDTO)) {
            return false;
        }

        ArtistDTO artistDTO = (ArtistDTO) o;
        if (this.spotifyURI == null) {
            return false;
        }
        return Objects.equals(this.spotifyURI, artistDTO.spotifyURI);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.spotifyURI);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArtistDTO{" +
            "spotifyURI='" + getSpotifyURI() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
