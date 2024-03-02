package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.domain.Persistable;

/**
 * A Artist.
 */
@JsonIgnoreProperties(value = { "new" })
@Entity
@Table(name = "artist")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Artist implements Serializable, Persistable<String> {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Id
    @Column(name = "spotify_uri", nullable = false)
    private String spotifyURI;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Transient
    private boolean isPersisted;

    @ManyToMany(mappedBy = "artists")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reviews", "artists", "folderEntries", "wantToListenListEntries", "album" }, allowSetters = true)
    private Set<Track> tracks = new HashSet<>();

    @ManyToMany(mappedBy = "artists")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "reviews", "artists", "folderEntries", "wantToListenListEntries" }, allowSetters = true)
    private Set<Album> albums = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public Artist spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getName() {
        return this.name;
    }

    public Artist name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
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

    public Artist setIsPersisted() {
        this.isPersisted = true;
        return this;
    }

    @PostLoad
    @PostPersist
    public void updateEntityState() {
        this.setIsPersisted();
    }

    public Set<Track> getTracks() {
        return this.tracks;
    }

    public void setTracks(Set<Track> tracks) {
        if (this.tracks != null) {
            this.tracks.forEach(i -> i.removeArtist(this));
        }
        if (tracks != null) {
            tracks.forEach(i -> i.addArtist(this));
        }
        this.tracks = tracks;
    }

    public Artist tracks(Set<Track> tracks) {
        this.setTracks(tracks);
        return this;
    }

    public Artist addTrack(Track track) {
        this.tracks.add(track);
        track.getArtists().add(this);
        return this;
    }

    public Artist removeTrack(Track track) {
        this.tracks.remove(track);
        track.getArtists().remove(this);
        return this;
    }

    public Set<Album> getAlbums() {
        return this.albums;
    }

    public void setAlbums(Set<Album> albums) {
        if (this.albums != null) {
            this.albums.forEach(i -> i.removeArtist(this));
        }
        if (albums != null) {
            albums.forEach(i -> i.addArtist(this));
        }
        this.albums = albums;
    }

    public Artist albums(Set<Album> albums) {
        this.setAlbums(albums);
        return this;
    }

    public Artist addAlbum(Album album) {
        this.albums.add(album);
        album.getArtists().add(this);
        return this;
    }

    public Artist removeAlbum(Album album) {
        this.albums.remove(album);
        album.getArtists().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Artist)) {
            return false;
        }
        return spotifyURI != null && spotifyURI.equals(((Artist) o).spotifyURI);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Artist{" +
            "spotifyURI=" + getSpotifyURI() +
            ", name='" + getName() + "'" +
            "}";
    }
}
