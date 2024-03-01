import { IUser } from 'app/entities/user/user.model';
import { ISpotifyConnection } from 'app/entities/spotify-connection/spotify-connection.model';

export interface IProfile {
  id: number;
  username?: string | null;
  spotifyURI?: string | null;
  profilePhoto?: string | null;
  profilePhotoContentType?: string | null;
  user?: Pick<IUser, 'id'> | null;
  spotifyConnection?: Pick<ISpotifyConnection, 'id'> | null;
}

export type NewProfile = Omit<IProfile, 'id'> & { id: null };
