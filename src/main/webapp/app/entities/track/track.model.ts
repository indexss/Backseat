import dayjs from 'dayjs/esm';
import { IArtist } from 'app/entities/artist/artist.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface ITrack {
  id: number;
  spotifyURI?: string | null;
  name?: string | null;
  description?: string | null;
  releaseDate?: dayjs.Dayjs | null;
  rating?: number | null;
  artists?: Pick<IArtist, 'id'>[] | null;
  album?: Pick<IAlbum, 'id'> | null;
}

export type NewTrack = Omit<ITrack, 'id'> & { id: null };
