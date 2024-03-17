package team.bham.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.Album} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AlbumDTO implements Serializable {

    @NotNull
    private String spotifyURI;

    @NotNull
    private String name;

    @NotNull
    private Integer totalTracks;

    @NotNull
    private LocalDate releaseDate;

    @NotNull
    private Double rating;

    @NotNull
    private String imageURL;

    private Set<ArtistDTO> artists = new HashSet<>();

    private Set<FolderEntryDTO> folderEntries = new HashSet<>();

    private Set<WantToListenListEntryDTO> wantToListenListEntries = new HashSet<>();

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

    public Integer getTotalTracks() {
        return totalTracks;
    }

    public void setTotalTracks(Integer totalTracks) {
        this.totalTracks = totalTracks;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Set<ArtistDTO> getArtists() {
        return artists;
    }

    public void setArtists(Set<ArtistDTO> artists) {
        this.artists = artists;
    }

    public Set<FolderEntryDTO> getFolderEntries() {
        return folderEntries;
    }

    public void setFolderEntries(Set<FolderEntryDTO> folderEntries) {
        this.folderEntries = folderEntries;
    }

    public Set<WantToListenListEntryDTO> getWantToListenListEntries() {
        return wantToListenListEntries;
    }

    public void setWantToListenListEntries(Set<WantToListenListEntryDTO> wantToListenListEntries) {
        this.wantToListenListEntries = wantToListenListEntries;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlbumDTO)) {
            return false;
        }

        AlbumDTO albumDTO = (AlbumDTO) o;
        if (this.spotifyURI == null) {
            return false;
        }
        return Objects.equals(this.spotifyURI, albumDTO.spotifyURI);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.spotifyURI);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlbumDTO{" +
            "spotifyURI='" + getSpotifyURI() + "'" +
            ", name='" + getName() + "'" +
            ", totalTracks=" + getTotalTracks() +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", rating=" + getRating() +
            ", imageURL='" + getImageURL() + "'" +
            ", artists=" + getArtists() +
            ", folderEntries=" + getFolderEntries() +
            ", wantToListenListEntries=" + getWantToListenListEntries() +
            "}";
    }
}
