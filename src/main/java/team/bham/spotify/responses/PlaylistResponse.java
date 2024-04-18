package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaylistResponse {
    @JsonProperty("uri")
    public String uri;

    @JsonProperty("name")
    public String name;

    @JsonProperty("id")
    public String id;
}
