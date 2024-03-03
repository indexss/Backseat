package team.bham.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link team.bham.domain.Track} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TrackDTO implements Serializable {

    @NotNull
    private String spotifyURI;

    @NotNull
    private String name;

    @NotNull
    private LocalDate releaseDate;

    @NotNull
    private Double rating;

    private Set<ArtistDTO> artists = new HashSet<>();

    private Set<FolderEntryDTO> folderEntries = new HashSet<>();

    private Set<WantToListenListEntryDTO> wantToListenListEntries = new HashSet<>();

    private AlbumDTO album;

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

    public AlbumDTO getAlbum() {
        return album;
    }

    public void setAlbum(AlbumDTO album) {
        this.album = album;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrackDTO)) {
            return false;
        }

        TrackDTO trackDTO = (TrackDTO) o;
        if (this.spotifyURI == null) {
            return false;
        }
        return Objects.equals(this.spotifyURI, trackDTO.spotifyURI);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.spotifyURI);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrackDTO{" +
            "spotifyURI='" + getSpotifyURI() + "'" +
            ", name='" + getName() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", rating=" + getRating() +
            ", artists=" + getArtists() +
            ", folderEntries=" + getFolderEntries() +
            ", wantToListenListEntries=" + getWantToListenListEntries() +
            ", album=" + getAlbum() +
            "}";
    }
}
