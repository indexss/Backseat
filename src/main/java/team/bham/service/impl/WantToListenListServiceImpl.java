package team.bham.service.impl;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.*;
import javax.annotation.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.Track;
import team.bham.domain.WantToListenListEntry;
import team.bham.repository.*;
import team.bham.service.WantToListenListService;
import team.bham.service.dto.WantToListenListItem;

@Service
@Transactional
public class WantToListenListServiceImpl implements WantToListenListService {

    @Resource
    private WantToListenListEntryRepository wantListRepository;

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private AlbumRepository albumRepository;

    @Resource
    private ReviewRepository reviewRepository;

    @Override
    public List<WantToListenListEntry> fetchAllWantToListenList() {
        return wantListRepository.findAllWantList();
    }

    @Override
    public List<WantToListenListItem> fetchUserWantToListenList(@Param("UserID") String userID) {
        //re-organized list before return value
        //return well-formed value for frontend
        List<WantToListenListEntry> entryList = wantListRepository.findAllByUserIDOrderByAddTimeDesc(userID);
        if (entryList.isEmpty()) {
            return null;
        }

        List<WantToListenListItem> itemList = new ArrayList<>();
        for (WantToListenListEntry entry : entryList) { //Add item infos for each entry
            String itemURI = entry.getSpotifyURI();
            System.out.println("**************entry.spotifyURI = " + itemURI);

            WantToListenListItem newItem = new WantToListenListItem(
                entry.getId(),
                entry.getUserID(),
                entry.getSpotifyURI(),
                entry.getAddTime().toString()
            );

            if (itemURI.contains(":track:")) { //Figure out album or track entry by reading spotifyURI, then fill newItem with infos
                //Searching track in repository
                Optional<Track> res = trackRepository.findById(itemURI);
                if (res.isEmpty()) {
                    continue;
                }
                Track newTrack = res.get();
                //fill infos
                newItem.setIdToDisplay((long) itemList.size() + 1);
                newItem.setItemName(newTrack.getName());
                newItem.setAlbumName(newTrack.getAlbum().getName());
                newItem.setArtists(ArtistSetToString(newTrack.getAlbum().getArtists()));
                newItem.setRating(newTrack.getRating());
                newItem.setReviewsCount(reviewRepository.findByTrackSpotifyURI(itemURI).size());
                newItem.setReleaseDate(newTrack.getReleaseDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                newItem.setCoverImgUrl(newTrack.getAlbum().getImageURL());
            } else if (itemURI.contains(":album:")) {
                //searching album in repository
                Optional<Album> res = albumRepository.findById(itemURI);
                if (res.isEmpty()) {
                    continue;
                }
                Album newAlbum = res.get();
                //fill infos
                newItem.setIdToDisplay((long) itemList.size() + 1);
                newItem.setItemName(newAlbum.getName());
                newItem.setArtists(ArtistSetToString(newAlbum.getArtists()));
                newItem.setRating(newAlbum.getRating());
                newItem.setReviewsCount(reviewRepository.findByAlbumSpotifyURI(itemURI).size());
                newItem.setReleaseDate(newAlbum.getReleaseDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                newItem.setCoverImgUrl(newAlbum.getImageURL());
            } else { // Unexpected case, passing out Unexpected cases only for testing, TODO: Change after "user's want-to-listen list" testing
                System.out.println("*************Unexpected spotifyURI: " + itemURI);
            }
            //Adding to List for return
            itemList.add(newItem);
        }
        return itemList;
    }

    private String ArtistSetToString(Set<Artist> artists) {
        List<Artist> artistList = new ArrayList<>(artists);
        Iterator<Artist> iterator = artistList.iterator();
        String artistName = iterator.next().getName();
        while (iterator.hasNext()) {
            artistName = artistName.concat(", ").concat(iterator.next().getName());
        }
        return artistName;
    }

    public List<WantToListenListItem> fetchTracksWithAlbumUri(String albumUri) {
        List<Track> tracks = trackRepository.findByAlbum(albumUri);
        List<WantToListenListItem> albumTrack = new ArrayList<>();
        for (Track track : tracks) {
            WantToListenListItem newItem = new WantToListenListItem(0L, "", track.getSpotifyURI(), "");
            albumTrack.add(newItem);
        }
        return albumTrack;
    }
}
