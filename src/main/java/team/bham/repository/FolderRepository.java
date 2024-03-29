package team.bham.repository;

import java.util.Set;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.Folder;
import team.bham.domain.FolderEntry;

/**
 * Spring Data JPA repository for the Folder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    @Query("SELECT f from Folder f WHERE f.profile.id = :folderId")
    Set<Folder> findByProfileId(@Param("folderId") Long profileId);
}
