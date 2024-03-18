package team.bham.service.impl;

import java.time.Instant;
import java.util.*;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.bham.domain.*;
import team.bham.repository.*;
import team.bham.service.FolderHandlerService;
import team.bham.service.dto.EntryDTO;
import team.bham.service.dto.FetchFolderDTO;
import team.bham.service.dto.FetchFolderEntryDTO;

@Service
@Transactional
public class FolderHandlerServiceImpl implements FolderHandlerService {

    @Resource
    private ProfileRepository profileRepository;

    @Resource
    private FolderRepository folderRepository;

    @Resource
    private FolderEntryRepository folderEntryRepository;

    @Resource
    private TrackRepository trackRepository;

    @Resource
    private AlbumRepository albumRepository;

    @Override
    public void generateFolder(String folderName, String username) {
        Folder folder = new Folder();
        folder.setName(folderName);
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(username);
        Profile profile = optionalProfile.get();
        folder.setProfile(profile);
        folderRepository.save(folder);
    }

    @Override
    public List<FetchFolderDTO> fetchFolder() {
        ArrayList<FetchFolderDTO> fetchFolderDTOS = new ArrayList<>();
        List<Folder> folders = folderRepository.findAll();
        for (int i = 0; i < folders.size(); i++) {
            FetchFolderDTO dto = new FetchFolderDTO();
            dto.setId(i + 1);
            dto.setFolderId(folders.get(i).getId());
            dto.setFolderName(folders.get(i).getName());
            byte[] image = folders.get(i).getImage();
            String imageContentType = folders.get(i).getImageContentType();
            if (image == null || imageContentType == null) {
                dto.setImageURL("https://i.scdn.co/image/ab67616d00001e02904445d70d04eb24d6bb79ac");
            } else {
                String imageURL = createImageURL(image, imageContentType);
                dto.setImageURL(imageURL);
            }

            fetchFolderDTOS.add(dto);
        }
        return fetchFolderDTOS;
    }

    public String createImageURL(byte[] image, String imageContentType) {
        // 将字节数组编码为Base64字符串
        String imageDataString = Base64.getEncoder().encodeToString(image);

        // 构建数据URI
        String imageURL = "data:" + imageContentType + ";base64," + imageDataString;

        return imageURL;
    }

    @Override
    public FetchFolderEntryDTO fetchFolderEntry(Long folderId) {
        FetchFolderEntryDTO fetchFolderEntryDTO = new FetchFolderEntryDTO();
        Optional<Folder> optionalfolder = folderRepository.findById(folderId);
        Folder folder = optionalfolder.get();
        fetchFolderEntryDTO.setFolderName(folder.getName());
        Set<FolderEntry> folderEntries = folderEntryRepository.findByFolderId(folderId);
        List<FolderEntry> folderEntryList = new ArrayList<>(folderEntries);
        List<EntryDTO> entryDTOS = new ArrayList<>();
        for (int i = 0; i < folderEntryList.size(); i++) {
            String spotifyURI = folderEntryList.get(i).getSpotifyURI();
            Optional<Track> trackOptional = trackRepository.findById(spotifyURI);
            if (trackOptional.isPresent()) {
                Track track = trackOptional.get();
                EntryDTO entryDTO = new EntryDTO(track.getName(), track.getAlbum().getImageURL());
                entryDTOS.add(entryDTO);
            } else {
                Optional<Album> albumOptional = albumRepository.findById(spotifyURI);
                Album album = albumOptional.get();
                EntryDTO entryDTO = new EntryDTO(album.getName(), album.getImageURL());
                entryDTOS.add(entryDTO);
            }
        }
        fetchFolderEntryDTO.setEntryList(entryDTOS);
        System.out.println("------------------" + fetchFolderEntryDTO.getEntryList().get(0));
        fetchFolderEntryDTO.setFolderEntries(folderEntries);
        return fetchFolderEntryDTO;
    }

    @Override
    public void addEntryToFolder(String spotifyURI, Long folderId) {
        FolderEntry folderEntry = new FolderEntry();
        folderEntry.setAddTime(Instant.now());
        folderEntry.setSpotifyURI(spotifyURI);
        Folder folder = new Folder();
        folder.setId(folderId);
        folderEntry.setFolder(folder);
        folderEntryRepository.save(folderEntry);
    }
}
