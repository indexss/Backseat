package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ImageResponse {

    @JsonProperty("url")
    public String url;

    @JsonProperty("width")
    public int width;

    @JsonProperty("height")
    public int height;
}
