package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

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
    public Album album;

    @JsonProperty("artists")
    public Artist[] artists;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Album {
        @JsonProperty("album_type")
        public String albumType;
        @JsonProperty("id")
        public String id;
        @JsonProperty("name")
        public String name;
        @JsonProperty("uri")
        public String uri;
        @JsonProperty("images")
        public Image[] images;

        public static class Image {
            @JsonProperty("url")
            public String url;
            @JsonProperty("height")
            public Integer height;
            @JsonProperty("width")
            public Integer width;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Artist {
        @JsonProperty("uri")
        public String uri;
        @JsonProperty("name")
        public String name;
        @JsonProperty("id")
        public String id;
    }
}
