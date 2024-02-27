import dayjs from 'dayjs/esm';
import { IArtist } from 'app/entities/artist/artist.model';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';

export interface IAlbum {
  id: number;
  spotifyURI?: string | null;
  name?: string | null;
  totalTracks?: number | null;
  description?: string | null;
  releaseDate?: dayjs.Dayjs | null;
  rating?: number | null;
  artists?: Pick<IArtist, 'id'>[] | null;
  folderEntries?: Pick<IFolderEntry, 'id'>[] | null;
  wantToListenListEntries?: Pick<IWantToListenListEntry, 'id'>[] | null;
}

export type NewAlbum = Omit<IAlbum, 'id'> & { id: null };
