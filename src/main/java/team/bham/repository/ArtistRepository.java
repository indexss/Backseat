package team.bham.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import team.bham.domain.Artist;

/**
 * Spring Data JPA repository for the Artist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtistRepository extends JpaRepository<Artist, String> {}
