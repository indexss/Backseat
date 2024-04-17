package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ArtistDTO;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AlbumResponse {

    @JsonProperty("album_type")
    public String albumType;

    @JsonProperty("id")
    public String id;

    @JsonProperty("name")
    public String name;

    @JsonProperty("uri")
    public String uri;

    @JsonProperty("images")
    public ImageResponse[] images;

    @JsonProperty("artists")
    public ArtistResponse[] artists;

    @JsonProperty("total_tracks")
    public Integer totalTracks;

    @JsonProperty("release_date")
    private String releaseDateStr;

    @JsonProperty("release_date_precision")
    private String releaseDatePrecision;

    public LocalDate getReleaseDate() {
        String[] parts = releaseDateStr.split("-");
        System.err.printf("%s %s\n", this.name, Arrays.toString(parts));
        if ("year".equals(releaseDatePrecision)) {
            return LocalDate.of(Integer.parseInt(parts[0]), 1, 1);
        }
        if ("month".equals(releaseDatePrecision)) {
            return LocalDate.of(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]), 1);
        }
        if ("day".equals(releaseDatePrecision)) {
            return LocalDate.of(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]), Integer.parseInt(parts[2]));
        }
        return null;
    }

    public AlbumDTO asDTO() {
        AlbumDTO adto = new AlbumDTO();

        adto.setSpotifyURI(this.uri);
        adto.setName(this.name);
        adto.setTotalTracks(this.totalTracks);
        adto.setReleaseDate(this.getReleaseDate());
        adto.setRating(0d);
        if (images.length == 0) {
            adto.setImageURL("https://avatars.platform.tdpain.net/" + this.uri);
        } else {
            adto.setImageURL(this.images[0].url);
        }

        Set<ArtistDTO> aset = new HashSet<>();
        for (ArtistResponse a: this.artists) {
            ArtistDTO x = new ArtistDTO();
            x.setSpotifyURI(a.uri);
            aset.add(x);
        }
        adto.setArtists(aset);

        return adto;
    }
}
