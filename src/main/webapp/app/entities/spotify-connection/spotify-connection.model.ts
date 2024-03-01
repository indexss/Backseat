import dayjs from 'dayjs/esm';

export interface ISpotifyConnection {
  id: number;
  spotifyURI?: string | null;
  refreshToken?: string | null;
  accessToken?: string | null;
  accessTokenExpiresAt?: dayjs.Dayjs | null;
}

export type NewSpotifyConnection = Omit<ISpotifyConnection, 'id'> & { id: null };
