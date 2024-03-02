import dayjs from 'dayjs/esm';
import { ITrack } from 'app/entities/track/track.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface IWantToListenListEntry {
  id: number;
  spotifyURI?: string | null;
  userID?: string | null;
  addTime?: dayjs.Dayjs | null;
  tracks?: Pick<ITrack, 'spotifyURI'>[] | null;
  albums?: Pick<IAlbum, 'spotifyURI'>[] | null;
}

export type NewWantToListenListEntry = Omit<IWantToListenListEntry, 'id'> & { id: null };
