package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A FolderEntry.
 */
@Entity
@Table(name = "folder_entry")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FolderEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "folder_id", nullable = false)
    private String folderID;

    @NotNull
    @Column(name = "spotify_uri", nullable = false)
    private String spotifyURI;

    @NotNull
    @Column(name = "add_time", nullable = false)
    private Instant addTime;

    @ManyToOne
    @JsonIgnoreProperties(value = { "folderEntries", "profile" }, allowSetters = true)
    private Folder folder;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public FolderEntry id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFolderID() {
        return this.folderID;
    }

    public FolderEntry folderID(String folderID) {
        this.setFolderID(folderID);
        return this;
    }

    public void setFolderID(String folderID) {
        this.folderID = folderID;
    }

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public FolderEntry spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public Instant getAddTime() {
        return this.addTime;
    }

    public FolderEntry addTime(Instant addTime) {
        this.setAddTime(addTime);
        return this;
    }

    public void setAddTime(Instant addTime) {
        this.addTime = addTime;
    }

    public Folder getFolder() {
        return this.folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }

    public FolderEntry folder(Folder folder) {
        this.setFolder(folder);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FolderEntry)) {
            return false;
        }
        return id != null && id.equals(((FolderEntry) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FolderEntry{" +
            "id=" + getId() +
            ", folderID='" + getFolderID() + "'" +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", addTime='" + getAddTime() + "'" +
            "}";
    }
}
