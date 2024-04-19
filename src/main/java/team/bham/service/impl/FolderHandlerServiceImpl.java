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
    public void generateFolder(String folderName, String userName) {
        try {
            Optional<Profile> optionalProfile = profileRepository.findByUserLogin(userName);
            Profile profile = optionalProfile.get();
            Optional<Folder> optionalFolder = folderRepository.isFolderExist(folderName, profile.getId());
            if (!optionalFolder.isPresent()) {
                Folder folder = new Folder();
                folder.setName(folderName);
                folder.setProfile(profile);
                folderRepository.save(folder);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteFolder(Long folderId) {
        Optional<Folder> optionalFolder = folderRepository.findById(folderId);
        Folder folder = optionalFolder.get();
        folderEntryRepository.deleteByFolderId(folderId);
        folderRepository.delete(folder);
    }

    @Override
    public void deleteFolderEntry(String spotifyURI, Long folderId, String userName) {
        try {
            Optional<Profile> optionalProfile = profileRepository.findByUserLogin(userName);
            Profile profile = optionalProfile.get();
            Optional<Folder> optionalFolder = folderRepository.findById(folderId);
            Folder folder = optionalFolder.get();
            if (folder.getProfile().getId() == profile.getId()) {
                Optional<FolderEntry> optionalFolderEntry = folderEntryRepository.isExist(spotifyURI, folderId);
                FolderEntry folderEntry = optionalFolderEntry.get();
                folderEntryRepository.delete(folderEntry);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<FetchFolderDTO> fetchFolder(String userName) {
        Optional<Profile> optionalProfile = profileRepository.findByUserLogin(userName);
        Profile profile = optionalProfile.get();
        ArrayList<FetchFolderDTO> fetchFolderDTOS = new ArrayList<>();
        Set<Folder> folderSet = folderRepository.findByProfileId(profile.getId());
        List<Folder> folders = new ArrayList<>(folderSet);
        for (int i = 0; i < folders.size(); i++) {
            FetchFolderDTO dto = new FetchFolderDTO();
            dto.setId(i + 1);
            dto.setFolderId(folders.get(i).getId());
            dto.setFolderName(folders.get(i).getName());
            byte[] image = folders.get(i).getImage();
            String imageContentType = folders.get(i).getImageContentType();
            if (image == null || imageContentType == null) {
                dto.setImageURL(
                    "data:image/png;base64,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"
                );
            } else {
                String imageURL = createImageURL(image, imageContentType);
                dto.setImageURL(imageURL);
            }
            fetchFolderDTOS.add(dto);
        }
        return fetchFolderDTOS;
    }

    public String createImageURL(byte[] image, String imageContentType) {
        String imageDataString = Base64.getEncoder().encodeToString(image);
        String imageURL = "data:" + imageContentType + ";base64," + imageDataString;
        return imageURL;
    }

    @Override
    public FetchFolderEntryDTO fetchFolderEntry(Long folderId) {
        FetchFolderEntryDTO fetchFolderEntryDTO = new FetchFolderEntryDTO();
        Optional<Folder> optionalfolder = folderRepository.findById(folderId);
        Folder folder = optionalfolder.get();
        fetchFolderEntryDTO.setFolderName(folder.getName());
        byte[] image = folder.getImage();
        String imageContentType = folder.getImageContentType();
        if (image == null || imageContentType == null) {
            fetchFolderEntryDTO.setImageURL(
                "data:image/png;base64,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"
            );
        } else {
            String imageURL = createImageURL(image, imageContentType);
            fetchFolderEntryDTO.setImageURL(imageURL);
        }
        Set<FolderEntry> folderEntries = folderEntryRepository.findByFolderId(folderId);
        List<FolderEntry> folderEntryList = new ArrayList<>(folderEntries);
        List<EntryDTO> entryDTOS = new ArrayList<>();
        for (int i = 0; i < folderEntryList.size(); i++) {
            String spotifyURI = folderEntryList.get(i).getSpotifyURI();
            Optional<Track> trackOptional = trackRepository.findById(spotifyURI);
            if (trackOptional.isPresent()) {
                Track track = trackOptional.get();
                Set<Artist> artists = track.getArtists();
                List<Artist> artistList = new ArrayList<>(artists);
                StringBuilder artistNameBuilder = new StringBuilder();
                for (int j = 0; j < artistList.size(); j++) {
                    if (j == artistList.size() - 1) {
                        artistNameBuilder.append(artistList.get(j).getName());
                    } else {
                        artistNameBuilder.append(artistList.get(j).getName());
                        artistNameBuilder.append(", ");
                    }
                }
                EntryDTO entryDTO = new EntryDTO(track.getName(), artistNameBuilder.toString(), track.getAlbum().getImageURL());
                entryDTOS.add(entryDTO);
            } else {
                Optional<Album> albumOptional = albumRepository.findById(spotifyURI);
                Album album = albumOptional.get();
                Set<Artist> artists = album.getArtists();
                List<Artist> artistList = new ArrayList<>(artists);
                StringBuilder artistNameBuilder = new StringBuilder();
                for (int j = 0; j < artistList.size(); j++) {
                    if (j == artistList.size() - 1) {
                        artistNameBuilder.append(artistList.get(j).getName());
                    } else {
                        artistNameBuilder.append(artistList.get(j).getName());
                        artistNameBuilder.append(", ");
                    }
                }
                EntryDTO entryDTO = new EntryDTO(album.getName(), artistNameBuilder.toString(), album.getImageURL());
                entryDTOS.add(entryDTO);
            }
        }
        fetchFolderEntryDTO.setEntryList(entryDTOS);
        fetchFolderEntryDTO.setFolderEntries(folderEntries);
        return fetchFolderEntryDTO;
    }

    @Override
    public void addEntryToFolder(String spotifyURI, Long folderId) {
        Optional<FolderEntry> optionalFolderEntry = folderEntryRepository.isExist(spotifyURI, folderId);
        if (!optionalFolderEntry.isPresent()) {
            FolderEntry folderEntry = new FolderEntry();
            folderEntry.setAddTime(Instant.now());
            folderEntry.setSpotifyURI(spotifyURI);
            Folder folder = new Folder();
            folder.setId(folderId);
            folderEntry.setFolder(folder);
            folderEntryRepository.save(folderEntry);
        }
    }
}
