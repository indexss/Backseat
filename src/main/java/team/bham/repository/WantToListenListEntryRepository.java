package team.bham.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import team.bham.domain.WantToListenListEntry;

/**
 * Spring Data JPA repository for the WantToListenListEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WantToListenListEntryRepository extends JpaRepository<WantToListenListEntry, Long> {}
