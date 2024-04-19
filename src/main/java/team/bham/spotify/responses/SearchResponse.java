package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchResponse {

    @JsonProperty("tracks")
    public TrackBox tracks;

    @JsonProperty("albums")
    public AlbumBox albums;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TrackBox {

        @JsonProperty("items")
        public TrackResponse[] items;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AlbumBox {

        @JsonProperty("items")
        public AlbumResponse[] items;
    }
}
