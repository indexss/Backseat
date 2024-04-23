package team.bham.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.Album;
import team.bham.domain.Track;

/**
 * Spring Data JPA repository for the Album entity.
 *
 * When extending this class, extend AlbumRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface AlbumRepository extends AlbumRepositoryWithBagRelationships, JpaRepository<Album, String> {
    default Optional<Album> findOneWithEagerRelationships(String spotifyURI) {
        return this.fetchBagRelationships(this.findById(spotifyURI));
    }

    default List<Album> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Album> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    @Query("SELECT a FROM Album a WHERE a.spotifyURI = :name")
    Album fetchAlbumbyRecentReview(@Param("name") String name);

    @Query(
        "select a from Album a where a.releaseDate > :startTime and a.releaseDate <= :endTime and (a.name like %:text%) order by a.rating DESC, size(a.reviews) DESC, a.name ASC"
    )
    Page<Album> fetchAlbumLBWithFilterRatingDESC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );

    @Query(
        "select a from Album a where a.releaseDate > :startTime and a.releaseDate <= :endTime and (a.name like %:text%) order by a.rating ASC, size(a.reviews) DESC, a.name ASC"
    )
    Page<Album> fetchAlbumLBWithFilterRatingASC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );

    @Query(
        "select a from Album a where a.releaseDate > :startTime and a.releaseDate <= :endTime and (a.name like %:text%) order by size(a.reviews) DESC, a.rating DESC, a.name ASC"
    )
    Page<Album> fetchAlbumLBWithFilterReviewsDESC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );

    @Query(
        "select a from Album a where a.releaseDate > :startTime and a.releaseDate <= :endTime and (a.name like %:text%) order by size(a.reviews) ASC, a.rating DESC, a.name ASC"
    )
    Page<Album> fetchAlbumLBWithFilterReviewsASC(
        @Param("startTime") LocalDate startTime,
        @Param("endTime") LocalDate endTime,
        @Param("text") String text,
        Pageable pageable
    );
}
