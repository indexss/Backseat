package team.bham.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import team.bham.domain.Track;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TrackRepositoryWithBagRelationshipsImpl implements TrackRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Track> fetchBagRelationships(Optional<Track> track) {
        return track.map(this::fetchArtists);
    }

    @Override
    public Page<Track> fetchBagRelationships(Page<Track> tracks) {
        return new PageImpl<>(fetchBagRelationships(tracks.getContent()), tracks.getPageable(), tracks.getTotalElements());
    }

    @Override
    public List<Track> fetchBagRelationships(List<Track> tracks) {
        return Optional.of(tracks).map(this::fetchArtists).orElse(Collections.emptyList());
    }

    Track fetchArtists(Track result) {
        return entityManager
            .createQuery("select track from Track track left join fetch track.artists where track is :track", Track.class)
            .setParameter("track", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Track> fetchArtists(List<Track> tracks) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tracks.size()).forEach(index -> order.put(tracks.get(index).getId(), index));
        List<Track> result = entityManager
            .createQuery("select distinct track from Track track left join fetch track.artists where track in :tracks", Track.class)
            .setParameter("tracks", tracks)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
