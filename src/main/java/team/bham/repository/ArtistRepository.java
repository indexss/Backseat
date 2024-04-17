package team.bham.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.Artist;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Spring Data JPA repository for the Artist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtistRepository extends JpaRepository<Artist, String> {

//    @Query("SELECT Artist.name FROM Artist INNER JOIN Track ON Track. = Artist.spotifyURI WHERE Track.spotifyURI = :track_uri")
//    List<String> getArtistNamesForTrack(@Param("track_uri") String trackURI);

    List<Artist> findByTracks_SpotifyURI(@NotNull String tracks_spotifyURI);
}
