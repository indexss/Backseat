package team.bham.repository;

import java.util.List;
import javax.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.WantToListenListEntry;

/**
 * Spring Data JPA repository for the WantToListenListEntry entity.
 */

/**
 * Spring Boot JPA document: https://docs.spring.io/spring-data/jpa/reference/index.html
 * JPA Repository mainly used for Database Query
 * Interface in demanded form will be implemented automatically by spring boot
 * You can also implement by yourself
 */
@SuppressWarnings("unused")
@Repository
public interface WantToListenListEntryRepository extends JpaRepository<WantToListenListEntry, Long> {
    @Query(value = "SELECT p FROM WantToListenListEntry p")
    List<WantToListenListEntry> findAllWantList();

    List<WantToListenListEntry> findAllByUserIDOrderByAddTimeAsc(@NotNull @Param("User ID") String userID);
}
