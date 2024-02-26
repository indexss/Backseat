import dayjs from 'dayjs/esm';
import { IArtist } from 'app/entities/artist/artist.model';

export interface IAlbum {
  id: number;
  spotifyURI?: string | null;
  name?: string | null;
  totalTracks?: number | null;
  description?: string | null;
  releaseDate?: dayjs.Dayjs | null;
  rating?: number | null;
  artists?: Pick<IArtist, 'id'>[] | null;
}

export type NewAlbum = Omit<IAlbum, 'id'> & { id: null };
