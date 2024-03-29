package team.bham.repository;

import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.bham.domain.FolderEntry;

/**
 * Spring Data JPA repository for the FolderEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FolderEntryRepository extends JpaRepository<FolderEntry, Long> {
    @Query("SELECT f from FolderEntry f WHERE f.folder.id = :folderId")
    Set<FolderEntry> findByFolderId(@Param("folderId") Long folderId);

    @Query("select f from FolderEntry f WHERE f.spotifyURI = :spotifyURI and f.folder.id = :folderId")
    Optional<FolderEntry> isExist(@Param("spotifyURI") String spotifyURI, @Param("folderId") Long folderId);
}
