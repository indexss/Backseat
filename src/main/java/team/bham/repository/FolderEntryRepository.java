package team.bham.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import team.bham.domain.FolderEntry;

/**
 * Spring Data JPA repository for the FolderEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FolderEntryRepository extends JpaRepository<FolderEntry, Long> {}
