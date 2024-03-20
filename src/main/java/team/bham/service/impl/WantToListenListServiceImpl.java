package team.bham.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.WantToListenListEntry;
import team.bham.repository.AlbumRepository;
import team.bham.repository.ArtistRepository;
import team.bham.repository.TrackRepository;
import team.bham.repository.WantToListenListEntryRepository;
import team.bham.service.WantToListenListService;

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
    public List<WantToListenListEntry> fetchUserWantToListenList(@Param("User ID") String userID) {
        return wantListRepository.findAllByUserIDOrderByAddTimeAsc(userID);
    }
}
