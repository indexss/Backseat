package team.bham.repository;

import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.Album;
import team.bham.domain.Review;

/**
 * Spring Data JPA repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Set<Review> findByTrackSpotifyURI(String spotifyURI);
    Set<Review> findByAlbumSpotifyURI(String spotifyURI);
    Set<Review> findByAlbum(Album album);

    @Query("select r from Review r order by r.date DESC")
    List<Review> fetchRecentReviews();
}
