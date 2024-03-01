import dayjs from 'dayjs/esm';
import { IProfile } from 'app/entities/profile/profile.model';
import { ITrack } from 'app/entities/track/track.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface IReview {
  id: number;
  rating?: number | null;
  content?: string | null;
  date?: dayjs.Dayjs | null;
  profile?: Pick<IProfile, 'id'> | null;
  track?: Pick<ITrack, 'spotifyURI'> | null;
  album?: Pick<IAlbum, 'spotifyURI'> | null;
}

export type NewReview = Omit<IReview, 'id'> & { id: null };
