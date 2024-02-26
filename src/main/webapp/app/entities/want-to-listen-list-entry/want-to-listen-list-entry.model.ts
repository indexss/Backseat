import dayjs from 'dayjs/esm';
import { ITrack } from 'app/entities/track/track.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface IWantToListenListEntry {
  id: number;
  spotifyURI?: string | null;
  userID?: string | null;
  addTime?: dayjs.Dayjs | null;
  tracks?: Pick<ITrack, 'id' | 'spotifyURI'>[] | null;
  albums?: Pick<IAlbum, 'id' | 'spotifyURI'>[] | null;
}

export type NewWantToListenListEntry = Omit<IWantToListenListEntry, 'id'> & { id: null };
