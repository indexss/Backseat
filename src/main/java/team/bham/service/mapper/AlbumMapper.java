package team.bham.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import team.bham.domain.Album;
import team.bham.domain.Artist;
import team.bham.domain.FolderEntry;
import team.bham.domain.WantToListenListEntry;
import team.bham.service.dto.AlbumDTO;
import team.bham.service.dto.ArtistDTO;
import team.bham.service.dto.FolderEntryDTO;
import team.bham.service.dto.WantToListenListEntryDTO;

/**
 * Mapper for the entity {@link Album} and its DTO {@link AlbumDTO}.
 */
@Mapper(componentModel = "spring")
public interface AlbumMapper extends EntityMapper<AlbumDTO, Album> {
    @Mapping(target = "artists", source = "artists", qualifiedByName = "artistSpotifyURISet")
    @Mapping(target = "folderEntries", source = "folderEntries", qualifiedByName = "folderEntryIdSet")
    @Mapping(target = "wantToListenListEntries", source = "wantToListenListEntries", qualifiedByName = "wantToListenListEntryIdSet")
    AlbumDTO toDto(Album s);

    @Mapping(target = "removeArtist", ignore = true)
    @Mapping(target = "removeFolderEntry", ignore = true)
    @Mapping(target = "removeWantToListenListEntry", ignore = true)
    Album toEntity(AlbumDTO albumDTO);

    @Named("artistSpotifyURI")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "spotifyURI", source = "spotifyURI")
    ArtistDTO toDtoArtistSpotifyURI(Artist artist);

    @Named("artistSpotifyURISet")
    default Set<ArtistDTO> toDtoArtistSpotifyURISet(Set<Artist> artist) {
        return artist.stream().map(this::toDtoArtistSpotifyURI).collect(Collectors.toSet());
    }

    @Named("folderEntryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FolderEntryDTO toDtoFolderEntryId(FolderEntry folderEntry);

    @Named("folderEntryIdSet")
    default Set<FolderEntryDTO> toDtoFolderEntryIdSet(Set<FolderEntry> folderEntry) {
        return folderEntry.stream().map(this::toDtoFolderEntryId).collect(Collectors.toSet());
    }

    @Named("wantToListenListEntryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WantToListenListEntryDTO toDtoWantToListenListEntryId(WantToListenListEntry wantToListenListEntry);

    @Named("wantToListenListEntryIdSet")
    default Set<WantToListenListEntryDTO> toDtoWantToListenListEntryIdSet(Set<WantToListenListEntry> wantToListenListEntry) {
        return wantToListenListEntry.stream().map(this::toDtoWantToListenListEntryId).collect(Collectors.toSet());
    }
}
