package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Set;
import team.bham.domain.Track;
import team.bham.service.dto.ArtistDTO;
import team.bham.service.dto.TrackDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TrackResponse {

    @JsonProperty("uri")
    public String uri;

    @JsonProperty("name")
    public String name;

    @JsonProperty("id")
    public String id;

    @JsonProperty("duration_ms")
    public Integer durationMilliseconds;

    @JsonProperty("album")
    public AlbumResponse album;

    @JsonProperty("artists")
    public ArtistResponse[] artists;

    public TrackDTO asDTO() {
        TrackDTO tdto = new TrackDTO();
        tdto.setSpotifyURI(this.uri);
        tdto.setName(this.name);
        tdto.setReleaseDate(this.album.getReleaseDate());
        tdto.setRating(0d);

        Set<ArtistDTO> artists = new HashSet<>();
        for (ArtistResponse a : this.artists) {
            artists.add(a.asDTO());
        }
        tdto.setArtists(artists);
        tdto.setAlbum(this.album.asDTO());

        return tdto;
    }
}
