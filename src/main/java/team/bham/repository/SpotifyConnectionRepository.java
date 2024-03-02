package team.bham.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import team.bham.domain.SpotifyConnection;

/**
 * Spring Data JPA repository for the SpotifyConnection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpotifyConnectionRepository extends JpaRepository<SpotifyConnection, String> {}
