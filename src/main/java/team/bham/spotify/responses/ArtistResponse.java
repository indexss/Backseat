package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import team.bham.service.dto.ArtistDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArtistResponse {

    @JsonProperty("uri")
    public String uri;

    @JsonProperty("name")
    public String name;

    @JsonProperty("id")
    public String id;

    public ArtistDTO asDTO() {
        ArtistDTO adto = new ArtistDTO();
        adto.setSpotifyURI(this.uri);
        adto.setName(this.name);
        return adto;
    }
}
