import dayjs from 'dayjs/esm';
import { IArtist } from 'app/entities/artist/artist.model';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface ITrack {
  spotifyURI: string;
  name?: string | null;
  releaseDate?: dayjs.Dayjs | null;
  rating?: number | null;
  artists?: Pick<IArtist, 'spotifyURI'>[] | null;
  folderEntries?: Pick<IFolderEntry, 'id'>[] | null;
  wantToListenListEntries?: Pick<IWantToListenListEntry, 'id'>[] | null;
  album?: Pick<IAlbum, 'spotifyURI'> | null;
}

export type NewTrack = Omit<ITrack, 'spotifyURI'> & { spotifyURI: null };
