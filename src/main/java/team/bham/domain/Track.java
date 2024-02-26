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

/**
 * A Track.
 */
@Entity
@Table(name = "track")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Track implements Serializable {

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
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @NotNull
    @Column(name = "rating", nullable = false)
    private Double rating;

    @OneToMany(mappedBy = "track")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "profile", "track", "album" }, allowSetters = true)
    private Set<Review> reviews = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_track__artist",
        joinColumns = @JoinColumn(name = "track_id"),
        inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "albums" }, allowSetters = true)
    private Set<Artist> artists = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_track__folder_entry",
        joinColumns = @JoinColumn(name = "track_id"),
        inverseJoinColumns = @JoinColumn(name = "folder_entry_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "folder", "tracks", "albums" }, allowSetters = true)
    private Set<FolderEntry> folderEntries = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_track__want_to_listen_list_entry",
        joinColumns = @JoinColumn(name = "track_id"),
        inverseJoinColumns = @JoinColumn(name = "want_to_listen_list_entry_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tracks", "albums" }, allowSetters = true)
    private Set<WantToListenListEntry> wantToListenListEntries = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "tracks", "reviews", "artists", "folderEntries", "wantToListenListEntries" }, allowSetters = true)
    private Album album;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Track id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public Track spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public String getName() {
        return this.name;
    }

    public Track name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Track description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getReleaseDate() {
        return this.releaseDate;
    }

    public Track releaseDate(LocalDate releaseDate) {
        this.setReleaseDate(releaseDate);
        return this;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Double getRating() {
        return this.rating;
    }

    public Track rating(Double rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void setReviews(Set<Review> reviews) {
        if (this.reviews != null) {
            this.reviews.forEach(i -> i.setTrack(null));
        }
        if (reviews != null) {
            reviews.forEach(i -> i.setTrack(this));
        }
        this.reviews = reviews;
    }

    public Track reviews(Set<Review> reviews) {
        this.setReviews(reviews);
        return this;
    }

    public Track addReview(Review review) {
        this.reviews.add(review);
        review.setTrack(this);
        return this;
    }

    public Track removeReview(Review review) {
        this.reviews.remove(review);
        review.setTrack(null);
        return this;
    }

    public Set<Artist> getArtists() {
        return this.artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public Track artists(Set<Artist> artists) {
        this.setArtists(artists);
        return this;
    }

    public Track addArtist(Artist artist) {
        this.artists.add(artist);
        artist.getTracks().add(this);
        return this;
    }

    public Track removeArtist(Artist artist) {
        this.artists.remove(artist);
        artist.getTracks().remove(this);
        return this;
    }

    public Set<FolderEntry> getFolderEntries() {
        return this.folderEntries;
    }

    public void setFolderEntries(Set<FolderEntry> folderEntries) {
        this.folderEntries = folderEntries;
    }

    public Track folderEntries(Set<FolderEntry> folderEntries) {
        this.setFolderEntries(folderEntries);
        return this;
    }

    public Track addFolderEntry(FolderEntry folderEntry) {
        this.folderEntries.add(folderEntry);
        folderEntry.getTracks().add(this);
        return this;
    }

    public Track removeFolderEntry(FolderEntry folderEntry) {
        this.folderEntries.remove(folderEntry);
        folderEntry.getTracks().remove(this);
        return this;
    }

    public Set<WantToListenListEntry> getWantToListenListEntries() {
        return this.wantToListenListEntries;
    }

    public void setWantToListenListEntries(Set<WantToListenListEntry> wantToListenListEntries) {
        this.wantToListenListEntries = wantToListenListEntries;
    }

    public Track wantToListenListEntries(Set<WantToListenListEntry> wantToListenListEntries) {
        this.setWantToListenListEntries(wantToListenListEntries);
        return this;
    }

    public Track addWantToListenListEntry(WantToListenListEntry wantToListenListEntry) {
        this.wantToListenListEntries.add(wantToListenListEntry);
        wantToListenListEntry.getTracks().add(this);
        return this;
    }

    public Track removeWantToListenListEntry(WantToListenListEntry wantToListenListEntry) {
        this.wantToListenListEntries.remove(wantToListenListEntry);
        wantToListenListEntry.getTracks().remove(this);
        return this;
    }

    public Album getAlbum() {
        return this.album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Track album(Album album) {
        this.setAlbum(album);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Track)) {
            return false;
        }
        return id != null && id.equals(((Track) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Track{" +
            "id=" + getId() +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
