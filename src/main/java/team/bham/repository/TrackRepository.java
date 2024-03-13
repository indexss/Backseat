package team.bham.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.Track;

/**
 * Spring Data JPA repository for the Track entity.
 *
 * When extending this class, extend TrackRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface TrackRepository extends TrackRepositoryWithBagRelationships, JpaRepository<Track, String> {
    default Optional<Track> findOneWithEagerRelationships(String spotifyURI) {
        return this.fetchBagRelationships(this.findById(spotifyURI));
    }

    default List<Track> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Track> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    @Query("SELECT t FROM Track t WHERE t.spotifyURI = :spotifyURI")
    Optional<Track> findBySpotifyURI(@Param("spotifyURI") String spotifyURI);

    @Query("select t from Track t order by t.rating DESC ")
    List<Track> fetchTrackByRating();

    @Query("select t from Track t order by t.rating DESC ")
    Page<Track> fetchTrackByRatingPagination(Pageable pageable);
}
