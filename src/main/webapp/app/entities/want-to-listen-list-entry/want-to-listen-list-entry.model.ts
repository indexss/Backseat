import dayjs from 'dayjs/esm';

export interface IWantToListenListEntry {
  id: number;
  spotifyURI?: string | null;
  userID?: string | null;
  addTime?: dayjs.Dayjs | null;
}

export type NewWantToListenListEntry = Omit<IWantToListenListEntry, 'id'> & { id: null };
