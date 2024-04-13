package team.bham.service.impl;

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
import team.bham.repository.AlbumRepository;
import team.bham.repository.ArtistRepository;
import team.bham.repository.TrackRepository;
import team.bham.repository.WantToListenListEntryRepository;
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
    private ArtistRepository artistRepository;

    @Override
    public List<WantToListenListEntry> fetchAllWantToListenList() {
        return wantListRepository.findAllWantList();
    }

    @Override
    public List<WantToListenListItem> fetchUserWantToListenList(@Param("UserID") String userID) {
        //re-organized list before return value
        //return well-formed value for frontend
        List<WantToListenListEntry> entryList = wantListRepository.findAllByUserIDOrderByAddTimeAsc(userID);
        if (entryList.isEmpty()) {
            return null;
        }
        List<WantToListenListItem> itemList = new ArrayList<>();
        for (WantToListenListEntry entry : entryList) { //Add item infos for each entry
            String itemURI = entry.getSpotifyURI();

            WantToListenListItem newItem = new WantToListenListItem(
                entry.getId(),
                entry.getUserID(),
                entry.getSpotifyURI(),
                entry.getAddTime().toString()
            );

            if (itemURI.contains(":track:")) { //Figure out album or track entry by reading spotifyURI, then fill newItem with infos
                //Searching track in repository
                Track newTrack = trackRepository.findById(itemURI).get();

                //fill infos
                newItem.setItemName(newTrack.getName());
                newItem.setAlbumName(newTrack.getAlbum().getName());
                newItem.setArtistList(newTrack.getArtists()); //TODO: test if artists set exists
                newItem.setRating(newTrack.getRating());
                newItem.setReviewsCount(newTrack.getReviews().size());
                newItem.setReleaseDate(newTrack.getReleaseDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            } else if (itemURI.contains(":album:")) {
                //searching album in repository
                Album newAlbum = albumRepository.findById(itemURI).get();

                //fill infos
                newItem.setItemName(newAlbum.getName());
                newItem.setArtistList(newAlbum.getArtists());
                newItem.setRating(newAlbum.getRating());
                newItem.setReviewsCount(newAlbum.getReviews().size());
                newItem.setReleaseDate(newAlbum.getReleaseDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            } else { // Unexpected case, passing out Unexpected cases only for testing, TODO: Change after 'user's want-to-listen list' testing
                System.out.println("*************Unexpected spotifyURI: " + itemURI);
            }
        }
        return itemList;
    }
}
