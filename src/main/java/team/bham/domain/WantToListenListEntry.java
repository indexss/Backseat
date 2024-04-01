package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WantToListenListEntry.
 */
@Entity
@Table(name = "want_to_listen_list_entry")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WantToListenListEntry implements Serializable {

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
    @Column(name = "user_id", nullable = false)
    private String userID;

    @NotNull
    @Column(name = "add_time", nullable = false)
    private Instant addTime;

    @ManyToMany(mappedBy = "wantToListenListEntries")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reviews", "artists", "folderEntries", "wantToListenListEntries", "album" }, allowSetters = true)
    private Set<Track> tracks = new HashSet<>();

    @ManyToMany(mappedBy = "wantToListenListEntries")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "reviews", "artists", "folderEntries", "wantToListenListEntries" }, allowSetters = true)
    private Set<Album> albums = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WantToListenListEntry id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public WantToListenListEntry spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getUserID() {
        return this.userID;
    }

    public WantToListenListEntry userID(String userID) {
        this.setUserID(userID);
        return this;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Instant getAddTime() {
        return this.addTime;
    }

    public WantToListenListEntry addTime(Instant addTime) {
        this.setAddTime(addTime);
        return this;
    }

    public void setAddTime(Instant addTime) {
        this.addTime = addTime;
    }

    public Set<Track> getTracks() {
        return this.tracks;
    }

    public void setTracks(Set<Track> tracks) {
        if (this.tracks != null) {
            this.tracks.forEach(i -> i.removeWantToListenListEntry(this));
        }
        if (tracks != null) {
            tracks.forEach(i -> i.addWantToListenListEntry(this));
        }
        this.tracks = tracks;
    }

    public WantToListenListEntry tracks(Set<Track> tracks) {
        this.setTracks(tracks);
        return this;
    }

    public WantToListenListEntry addTrack(Track track) {
        this.tracks.add(track);
        track.getWantToListenListEntries().add(this);
        return this;
    }

    public WantToListenListEntry removeTrack(Track track) {
        this.tracks.remove(track);
        track.getWantToListenListEntries().remove(this);
        return this;
    }

    public Set<Album> getAlbums() {
        return this.albums;
    }

    public void setAlbums(Set<Album> albums) {
        if (this.albums != null) {
            this.albums.forEach(i -> i.removeWantToListenListEntry(this));
        }
        if (albums != null) {
            albums.forEach(i -> i.addWantToListenListEntry(this));
        }
        this.albums = albums;
    }

    public WantToListenListEntry albums(Set<Album> albums) {
        this.setAlbums(albums);
        return this;
    }

    public WantToListenListEntry addAlbum(Album album) {
        this.albums.add(album);
        album.getWantToListenListEntries().add(this);
        return this;
    }

    public WantToListenListEntry removeAlbum(Album album) {
        this.albums.remove(album);
        album.getWantToListenListEntries().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WantToListenListEntry)) {
            return false;
        }
        return id != null && id.equals(((WantToListenListEntry) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WantToListenListEntry{" +
            "id=" + getId() +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", userID='" + getUserID() + "'" +
            ", addTime='" + getAddTime() + "'" +
            "}";
    }
}
