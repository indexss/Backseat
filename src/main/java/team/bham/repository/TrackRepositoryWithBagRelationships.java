package team.bham.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import team.bham.domain.Track;

public interface TrackRepositoryWithBagRelationships {
    Optional<Track> fetchBagRelationships(Optional<Track> track);

    List<Track> fetchBagRelationships(List<Track> tracks);

    Page<Track> fetchBagRelationships(Page<Track> tracks);
}
