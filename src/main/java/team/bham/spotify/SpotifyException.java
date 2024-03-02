package team.bham.spotify;

public class SpotifyException extends Exception {
    public String error;

    public SpotifyException(String errorMessage) {
        super(errorMessage);
    }

    public SpotifyException(String errorMessage, String error) {
        super(errorMessage);
        this.error = error;
    }
}
