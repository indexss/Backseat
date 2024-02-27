package team.bham.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.WantToListenListEntry} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WantToListenListEntryDTO implements Serializable {

    private Long id;

    @NotNull
    private String spotifyURI;

    @NotNull
    private String userID;

    @NotNull
    private Instant addTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpotifyURI() {
        return spotifyURI;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Instant getAddTime() {
        return addTime;
    }

    public void setAddTime(Instant addTime) {
        this.addTime = addTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WantToListenListEntryDTO)) {
            return false;
        }

        WantToListenListEntryDTO wantToListenListEntryDTO = (WantToListenListEntryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, wantToListenListEntryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WantToListenListEntryDTO{" +
            "id=" + getId() +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", userID='" + getUserID() + "'" +
            ", addTime='" + getAddTime() + "'" +
            "}";
    }
}
