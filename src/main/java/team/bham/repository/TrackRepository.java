package team.bham.repository;

import java.time.LocalDate;
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

    //    @Query("select t from Track t order by t.rating DESC ")
    @Query("select t from Track t order by t.rating DESC, size(t.reviews) DESC, t.name ASC")
    Page<Track> fetchTrackByRatingPagination(Pageable pageable);

    //    @Query("select t from Track t WHERE t.albumspotifyURI = :albumURI")
    @Query("select t from Track t WHERE t.album.spotifyURI = :albumURI")
    List<Track> findByAlbum(@Param("albumURI") String albumURI);

    @Query("SELECT t FROM Track t WHERE t.name = :name AND t.album.name = :album")
    Track fetchTrackbyRecentReview(@Param("name") String name, @Param("album") String album);

    // orderKey = rating / size(reviews), order = asc / desc, between startTime and endTime,  search = text, could order by rating or size of the reviews;

    @Query(
        "select t from Track t where t.releaseDate > :startTime and t.releaseDate <= :endTime and (t.name like %:text% or t.album.name like %:text%) order by t.rating DESC, size(t.reviews) DESC, t.name ASC"
    )
    Page<Track> fetchTrackLBWithFilterRatingDESC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );

    @Query(
        "select t from Track t where t.releaseDate > :startTime and t.releaseDate <= :endTime and (t.name like %:text% or t.album.name like %:text%) order by t.rating ASC, size(t.reviews) DESC, t.name ASC"
    )
    Page<Track> fetchTrackLBWithFilterRatingASC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );

    @Query(
        "select t from Track t where t.releaseDate > :startTime and t.releaseDate <= :endTime and (t.name like %:text% or t.album.name like %:text%) order by size(t.reviews) DESC, t.rating DESC, t.name ASC"
    )
    Page<Track> fetchTrackLBWithFilterReviewsDESC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );

    @Query(
        "select t from Track t where t.releaseDate > :startTime and t.releaseDate <= :endTime and (t.name like %:text% or t.album.name like %:text%) order by size(t.reviews) ASC, t.rating DESC, t.name ASC"
    )
    Page<Track> fetchTrackLBFilterReviewsASC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );
}
