package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.domain.Persistable;

/**
 * A Album.
 */
@JsonIgnoreProperties(value = { "new" })
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Album implements Serializable, Persistable<String> {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Id
    @Column(name = "spotify_uri", nullable = false)
    private String spotifyURI;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "total_tracks", nullable = false)
    private Integer totalTracks;

    @NotNull
    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @NotNull
    @Column(name = "rating", nullable = false)
    private Double rating;

    @NotNull
    @Column(name = "image_url", nullable = false)
    private String imageURL;

    @Transient
    private boolean isPersisted;

    @OneToMany(mappedBy = "album")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reviews", "artists", "folderEntries", "wantToListenListEntries", "album" }, allowSetters = true)
    private Set<Track> tracks = new HashSet<>();

    @OneToMany(mappedBy = "album")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "profile", "track", "album" }, allowSetters = true)
    private Set<Review> reviews = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_album__artist",
        joinColumns = @JoinColumn(name = "album_spotify_uri"),
        inverseJoinColumns = @JoinColumn(name = "artist_spotify_uri")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "albums" }, allowSetters = true)
    private Set<Artist> artists = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_album__folder_entry",
        joinColumns = @JoinColumn(name = "album_spotify_uri"),
        inverseJoinColumns = @JoinColumn(name = "folder_entry_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "folder", "tracks", "albums" }, allowSetters = true)
    private Set<FolderEntry> folderEntries = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_album__want_to_listen_list_entry",
        joinColumns = @JoinColumn(name = "album_spotify_uri"),
        inverseJoinColumns = @JoinColumn(name = "want_to_listen_list_entry_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "albums" }, allowSetters = true)
    private Set<WantToListenListEntry> wantToListenListEntries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public Album spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getName() {
        return this.name;
    }

    public Album name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTotalTracks() {
        return this.totalTracks;
    }

    public Album totalTracks(Integer totalTracks) {
        this.setTotalTracks(totalTracks);
        return this;
    }

    public void setTotalTracks(Integer totalTracks) {
        this.totalTracks = totalTracks;
    }

    public LocalDate getReleaseDate() {
        return this.releaseDate;
    }

    public Album releaseDate(LocalDate releaseDate) {
        this.setReleaseDate(releaseDate);
        return this;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Double getRating() {
        return this.rating;
    }

    public Album rating(Double rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImageURL() {
        return this.imageURL;
    }

    public Album imageURL(String imageURL) {
        this.setImageURL(imageURL);
        return this;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
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

    public Album setIsPersisted() {
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
            this.tracks.forEach(i -> i.setAlbum(null));
        }
        if (tracks != null) {
            tracks.forEach(i -> i.setAlbum(this));
        }
        this.tracks = tracks;
    }

    public Album tracks(Set<Track> tracks) {
        this.setTracks(tracks);
        return this;
    }

    public Album addTrack(Track track) {
        this.tracks.add(track);
        track.setAlbum(this);
        return this;
    }

    public Album removeTrack(Track track) {
        this.tracks.remove(track);
        track.setAlbum(null);
        return this;
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void setReviews(Set<Review> reviews) {
        if (this.reviews != null) {
            this.reviews.forEach(i -> i.setAlbum(null));
        }
        if (reviews != null) {
            reviews.forEach(i -> i.setAlbum(this));
        }
        this.reviews = reviews;
    }

    public Album reviews(Set<Review> reviews) {
        this.setReviews(reviews);
        return this;
    }

    public Album addReview(Review review) {
        this.reviews.add(review);
        review.setAlbum(this);
        return this;
    }

    public Album removeReview(Review review) {
        this.reviews.remove(review);
        review.setAlbum(null);
        return this;
    }

    public Set<Artist> getArtists() {
        return this.artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public Album artists(Set<Artist> artists) {
        this.setArtists(artists);
        return this;
    }

    public Album addArtist(Artist artist) {
        this.artists.add(artist);
        artist.getAlbums().add(this);
        return this;
    }

    public Album removeArtist(Artist artist) {
        this.artists.remove(artist);
        artist.getAlbums().remove(this);
        return this;
    }

    public Set<FolderEntry> getFolderEntries() {
        return this.folderEntries;
    }

    public void setFolderEntries(Set<FolderEntry> folderEntries) {
        this.folderEntries = folderEntries;
    }

    public Album folderEntries(Set<FolderEntry> folderEntries) {
        this.setFolderEntries(folderEntries);
        return this;
    }

    public Album addFolderEntry(FolderEntry folderEntry) {
        this.folderEntries.add(folderEntry);
        folderEntry.getAlbums().add(this);
        return this;
    }

    public Album removeFolderEntry(FolderEntry folderEntry) {
        this.folderEntries.remove(folderEntry);
        folderEntry.getAlbums().remove(this);
        return this;
    }

    public Set<WantToListenListEntry> getWantToListenListEntries() {
        return this.wantToListenListEntries;
    }

    public void setWantToListenListEntries(Set<WantToListenListEntry> wantToListenListEntries) {
        this.wantToListenListEntries = wantToListenListEntries;
    }

    public Album wantToListenListEntries(Set<WantToListenListEntry> wantToListenListEntries) {
        this.setWantToListenListEntries(wantToListenListEntries);
        return this;
    }

    public Album addWantToListenListEntry(WantToListenListEntry wantToListenListEntry) {
        this.wantToListenListEntries.add(wantToListenListEntry);
        wantToListenListEntry.getAlbums().add(this);
        return this;
    }

    public Album removeWantToListenListEntry(WantToListenListEntry wantToListenListEntry) {
        this.wantToListenListEntries.remove(wantToListenListEntry);
        wantToListenListEntry.getAlbums().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Album)) {
            return false;
        }
        return spotifyURI != null && spotifyURI.equals(((Album) o).spotifyURI);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Album{" +
            "spotifyURI=" + getSpotifyURI() +
            ", name='" + getName() + "'" +
            ", totalTracks=" + getTotalTracks() +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", rating=" + getRating() +
            ", imageURL='" + getImageURL() + "'" +
            "}";
    }
}
