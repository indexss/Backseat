package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
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
    @Column(name = "spotify_uri", nullable = false)
    private String spotifyURI;

    @NotNull
    @Column(name = "add_time", nullable = false)
    private Instant addTime;

    @ManyToOne
    @JsonIgnoreProperties(value = { "folderEntries", "profile" }, allowSetters = true)
    private Folder folder;

    @ManyToMany(mappedBy = "folderEntries")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reviews", "artists", "folderEntries", "wantToListenListEntries", "album" }, allowSetters = true)
    private Set<Track> tracks = new HashSet<>();

    @ManyToMany(mappedBy = "folderEntries")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "reviews", "artists", "folderEntries", "wantToListenListEntries" }, allowSetters = true)
    private Set<Album> albums = new HashSet<>();

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

    public Set<Track> getTracks() {
        return this.tracks;
    }

    public void setTracks(Set<Track> tracks) {
        if (this.tracks != null) {
            this.tracks.forEach(i -> i.removeFolderEntry(this));
        }
        if (tracks != null) {
            tracks.forEach(i -> i.addFolderEntry(this));
        }
        this.tracks = tracks;
    }

    public FolderEntry tracks(Set<Track> tracks) {
        this.setTracks(tracks);
        return this;
    }

    public FolderEntry addTrack(Track track) {
        this.tracks.add(track);
        track.getFolderEntries().add(this);
        return this;
    }

    public FolderEntry removeTrack(Track track) {
        this.tracks.remove(track);
        track.getFolderEntries().remove(this);
        return this;
    }

    public Set<Album> getAlbums() {
        return this.albums;
    }

    public void setAlbums(Set<Album> albums) {
        if (this.albums != null) {
            this.albums.forEach(i -> i.removeFolderEntry(this));
        }
        if (albums != null) {
            albums.forEach(i -> i.addFolderEntry(this));
        }
        this.albums = albums;
    }

    public FolderEntry albums(Set<Album> albums) {
        this.setAlbums(albums);
        return this;
    }

    public FolderEntry addAlbum(Album album) {
        this.albums.add(album);
        album.getFolderEntries().add(this);
        return this;
    }

    public FolderEntry removeAlbum(Album album) {
        this.albums.remove(album);
        album.getFolderEntries().remove(this);
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
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", addTime='" + getAddTime() + "'" +
            "}";
    }
}
