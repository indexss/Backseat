package team.bham.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.Profile;
import team.bham.domain.User;

/**
 * Spring Data JPA repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    @Query("SELECT p FROM Profile p WHERE p.user.login = :login")
    Optional<Profile> findByUserLogin(@Param("login") String login);
}
