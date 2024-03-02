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
import team.bham.domain.Album;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class AlbumRepositoryWithBagRelationshipsImpl implements AlbumRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Album> fetchBagRelationships(Optional<Album> album) {
        return album.map(this::fetchArtists).map(this::fetchFolderEntries).map(this::fetchWantToListenListEntries);
    }

    @Override
    public Page<Album> fetchBagRelationships(Page<Album> albums) {
        return new PageImpl<>(fetchBagRelationships(albums.getContent()), albums.getPageable(), albums.getTotalElements());
    }

    @Override
    public List<Album> fetchBagRelationships(List<Album> albums) {
        return Optional
            .of(albums)
            .map(this::fetchArtists)
            .map(this::fetchFolderEntries)
            .map(this::fetchWantToListenListEntries)
            .orElse(Collections.emptyList());
    }

    Album fetchArtists(Album result) {
        return entityManager
            .createQuery("select album from Album album left join fetch album.artists where album is :album", Album.class)
            .setParameter("album", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Album> fetchArtists(List<Album> albums) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, albums.size()).forEach(index -> order.put(albums.get(index).getSpotifyURI(), index));
        List<Album> result = entityManager
            .createQuery("select distinct album from Album album left join fetch album.artists where album in :albums", Album.class)
            .setParameter("albums", albums)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getSpotifyURI()), order.get(o2.getSpotifyURI())));
        return result;
    }

    Album fetchFolderEntries(Album result) {
        return entityManager
            .createQuery("select album from Album album left join fetch album.folderEntries where album is :album", Album.class)
            .setParameter("album", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Album> fetchFolderEntries(List<Album> albums) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, albums.size()).forEach(index -> order.put(albums.get(index).getSpotifyURI(), index));
        List<Album> result = entityManager
            .createQuery("select distinct album from Album album left join fetch album.folderEntries where album in :albums", Album.class)
            .setParameter("albums", albums)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getSpotifyURI()), order.get(o2.getSpotifyURI())));
        return result;
    }

    Album fetchWantToListenListEntries(Album result) {
        return entityManager
            .createQuery("select album from Album album left join fetch album.wantToListenListEntries where album is :album", Album.class)
            .setParameter("album", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Album> fetchWantToListenListEntries(List<Album> albums) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, albums.size()).forEach(index -> order.put(albums.get(index).getSpotifyURI(), index));
        List<Album> result = entityManager
            .createQuery(
                "select distinct album from Album album left join fetch album.wantToListenListEntries where album in :albums",
                Album.class
            )
            .setParameter("albums", albums)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getSpotifyURI()), order.get(o2.getSpotifyURI())));
        return result;
    }
}
