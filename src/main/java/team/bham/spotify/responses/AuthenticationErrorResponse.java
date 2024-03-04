package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import team.bham.spotify.SpotifyException;

public class AuthenticationErrorResponse {
    @JsonProperty("error")
    public String error;

    @JsonProperty("error_description")
    public String errorDescription;

    public SpotifyException toException() {
        return new SpotifyException(errorDescription, error);
    }
}
