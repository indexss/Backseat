package team.bham.service;

import java.util.List;
import team.bham.domain.WantToListenListEntry;
import team.bham.service.dto.WantToListenListItem;

public interface WantToListenListService {
    List<WantToListenListEntry> fetchAllWantToListenList();

    List<WantToListenListItem> fetchUserWantToListenList(String userID);

    List<WantToListenListItem> fetchTracksWithAlbumUri(String albumUri);
}
