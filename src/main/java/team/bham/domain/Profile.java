package team.bham.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Profile.
 */
@Entity
@Table(name = "profile")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @Column(name = "spotify_uri", nullable = false)
    private String spotifyURI;

    @Lob
    @Column(name = "profile_photo")
    private byte[] profilePhoto;

    @Column(name = "profile_photo_content_type")
    private String profilePhotoContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @JsonIgnoreProperties(value = { "profile" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private SpotifyConnection spotifyConnection;

    @OneToMany(mappedBy = "profile")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "folderEntries", "profile" }, allowSetters = true)
    private Set<Folder> folders = new HashSet<>();

    @OneToMany(mappedBy = "profile")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "profile", "track", "album" }, allowSetters = true)
    private Set<Review> reviews = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Profile id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public Profile username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSpotifyURI() {
        return this.spotifyURI;
    }

    public Profile spotifyURI(String spotifyURI) {
        this.setSpotifyURI(spotifyURI);
        return this;
    }

    public void setSpotifyURI(String spotifyURI) {
        this.spotifyURI = spotifyURI;
    }

    public byte[] getProfilePhoto() {
        return this.profilePhoto;
    }

    public Profile profilePhoto(byte[] profilePhoto) {
        this.setProfilePhoto(profilePhoto);
        return this;
    }

    public void setProfilePhoto(byte[] profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getProfilePhotoContentType() {
        return this.profilePhotoContentType;
    }

    public Profile profilePhotoContentType(String profilePhotoContentType) {
        this.profilePhotoContentType = profilePhotoContentType;
        return this;
    }

    public void setProfilePhotoContentType(String profilePhotoContentType) {
        this.profilePhotoContentType = profilePhotoContentType;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Profile user(User user) {
        this.setUser(user);
        return this;
    }

    public SpotifyConnection getSpotifyConnection() {
        return this.spotifyConnection;
    }

    public void setSpotifyConnection(SpotifyConnection spotifyConnection) {
        this.spotifyConnection = spotifyConnection;
    }

    public Profile spotifyConnection(SpotifyConnection spotifyConnection) {
        this.setSpotifyConnection(spotifyConnection);
        return this;
    }

    public Set<Folder> getFolders() {
        return this.folders;
    }

    public void setFolders(Set<Folder> folders) {
        if (this.folders != null) {
            this.folders.forEach(i -> i.setProfile(null));
        }
        if (folders != null) {
            folders.forEach(i -> i.setProfile(this));
        }
        this.folders = folders;
    }

    public Profile folders(Set<Folder> folders) {
        this.setFolders(folders);
        return this;
    }

    public Profile addFolder(Folder folder) {
        this.folders.add(folder);
        folder.setProfile(this);
        return this;
    }

    public Profile removeFolder(Folder folder) {
        this.folders.remove(folder);
        folder.setProfile(null);
        return this;
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void setReviews(Set<Review> reviews) {
        if (this.reviews != null) {
            this.reviews.forEach(i -> i.setProfile(null));
        }
        if (reviews != null) {
            reviews.forEach(i -> i.setProfile(this));
        }
        this.reviews = reviews;
    }

    public Profile reviews(Set<Review> reviews) {
        this.setReviews(reviews);
        return this;
    }

    public Profile addReview(Review review) {
        this.reviews.add(review);
        review.setProfile(this);
        return this;
    }

    public Profile removeReview(Review review) {
        this.reviews.remove(review);
        review.setProfile(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profile)) {
            return false;
        }
        return id != null && id.equals(((Profile) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profile{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", spotifyURI='" + getSpotifyURI() + "'" +
            ", profilePhoto='" + getProfilePhoto() + "'" +
            ", profilePhotoContentType='" + getProfilePhotoContentType() + "'" +
            "}";
    }
}
