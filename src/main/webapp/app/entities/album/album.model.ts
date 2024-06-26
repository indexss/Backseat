import dayjs from 'dayjs/esm';
import { IArtist } from 'app/entities/artist/artist.model';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';

export interface IAlbum {
  spotifyURI: string;
  name?: string | null;
  totalTracks?: number | null;
  releaseDate?: dayjs.Dayjs | null;
  rating?: number | null;
  imageURL?: string | null;
  artists?: Pick<IArtist, 'spotifyURI'>[] | null;
  folderEntries?: Pick<IFolderEntry, 'id'>[] | null;
  wantToListenListEntries?: Pick<IWantToListenListEntry, 'id'>[] | null;
}

export type NewAlbum = Omit<IAlbum, 'spotifyURI'> & { spotifyURI: null };
