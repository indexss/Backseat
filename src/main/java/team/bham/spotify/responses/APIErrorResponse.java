package team.bham.spotify.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import team.bham.spotify.SpotifyException;

public class APIErrorResponse {
    @JsonProperty("status")
    public Integer status;

    @JsonProperty("message")
    public String message;

    public SpotifyException toException() {
        return new SpotifyException(message, status);
    }
}
