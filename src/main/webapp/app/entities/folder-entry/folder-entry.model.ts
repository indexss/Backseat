import dayjs from 'dayjs/esm';
import { IFolder } from 'app/entities/folder/folder.model';
import { ITrack } from 'app/entities/track/track.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface IFolderEntry {
  id: number;
  spotifyURI?: string | null;
  addTime?: dayjs.Dayjs | null;
  folder?: Pick<IFolder, 'id'> | null;
  tracks?: Pick<ITrack, 'spotifyURI'>[] | null;
  albums?: Pick<IAlbum, 'spotifyURI'>[] | null;
}

export type NewFolderEntry = Omit<IFolderEntry, 'id'> & { id: null };
