package team.bham.spotify;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SpotifyException extends Exception {

    public String error;
    public Integer status;

    public SpotifyException(String errorMessage) {
        super(errorMessage);
    }

    public SpotifyException(String errorMessage, String error) {
        super(errorMessage);
        this.error = error;
    }

    public SpotifyException(String errorMessage, Integer status) {
        super(errorMessage);
        this.status = status;
    }

    public ResponseStatusException toResponseStatusException() {
        if (this.status == null) {
            return new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Spotify failure", this);
        }
        return new ResponseStatusException(status, "Spotify failure", this);
    }
}
