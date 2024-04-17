package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchResponse {
    @JsonProperty("tracks")
    public TrackBox tracks;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TrackBox {
        @JsonProperty("items")
        public TrackResponse[] items;
    }
}
