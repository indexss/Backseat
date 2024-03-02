import dayjs from 'dayjs/esm';

export interface ISpotifyConnection {
  spotifyURI: string;
  refreshToken?: string | null;
  accessToken?: string | null;
  accessTokenExpiresAt?: dayjs.Dayjs | null;
}

export type NewSpotifyConnection = Omit<ISpotifyConnection, 'spotifyURI'> & { spotifyURI: null };
