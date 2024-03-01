package team.bham.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.FolderEntry} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FolderEntryDTO implements Serializable {

    private Long id;

    @NotNull
    private String spotifyURI;

    @NotNull
    private Instant addTime;

    private FolderDTO folder;

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

    public Instant getAddTime() {
        return addTime;
    }

    public void setAddTime(Instant addTime) {
        this.addTime = addTime;
    }

    public FolderDTO getFolder() {
        return folder;
    }

    public void setFolder(FolderDTO folder) {
        this.folder = folder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FolderEntryDTO)) {
            return false;
        }

        FolderEntryDTO folderEntryDTO = (FolderEntryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, folderEntryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FolderEntryDTO{" +
            "id=" + getId() +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", addTime='" + getAddTime() + "'" +
            ", folder=" + getFolder() +
            "}";
    }
}
