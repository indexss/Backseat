package team.bham.repository;

import java.util.List;
import java.util.Optional;
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

    @Query("select f from Folder f WHERE f.name = :folderName and f.profile.id = :profileId")
    Optional<Folder> isFolderExist(@Param("folderName") String folderName, @Param("profileId") Long profileId);

    @Query("SELECT f FROM Folder f ORDER BY f.id ASC")
    List<Folder> findAllOrderByIdAsc();
}
