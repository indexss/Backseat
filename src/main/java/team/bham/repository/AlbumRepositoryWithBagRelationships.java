package team.bham.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import team.bham.domain.Album;

public interface AlbumRepositoryWithBagRelationships {
    Optional<Album> fetchBagRelationships(Optional<Album> album);

    List<Album> fetchBagRelationships(List<Album> albums);

    Page<Album> fetchBagRelationships(Page<Album> albums);
}
