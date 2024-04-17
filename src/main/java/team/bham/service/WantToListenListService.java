package team.bham.service;

import java.util.List;
import team.bham.domain.WantToListenListEntry;

public interface WantToListenListService {
    List<WantToListenListEntry> fetchAllWantToListenList();

    List<WantToListenListEntry> fetchUserWantToListenList(String userID);
}
