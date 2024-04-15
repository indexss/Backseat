package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserProfileResponse {

    @JsonProperty("display_name")
    public String displayName;

    @JsonProperty("id")
    public String id;

    @JsonProperty("uri")
    public String uri;

    @JsonProperty("images")
    public ImageResponse[] images;

    @Override
    public String toString() {
        return "UserProfileResponse{" + "displayName='" + displayName + '\'' + ", id='" + id + '\'' + ", uri='" + uri + '\'' + '}';
    }
}
