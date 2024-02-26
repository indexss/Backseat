import dayjs from 'dayjs/esm';

import { ISpotifyConnection, NewSpotifyConnection } from './spotify-connection.model';

export const sampleWithRequiredData: ISpotifyConnection = {
  id: 97145,
  spotifyURI: 'Representative withdrawal',
  refreshToken: 'User-centric Music Hong',
  accessToken: 'collaboration transitional',
  accessTokenExpiresAt: dayjs('2024-02-26T14:37'),
};

export const sampleWithPartialData: ISpotifyConnection = {
  id: 56095,
  spotifyURI: 'quantify Chips',
  refreshToken: 'Engineer lavender online',
  accessToken: 'Electronics Zloty',
  accessTokenExpiresAt: dayjs('2024-02-26T03:25'),
};

export const sampleWithFullData: ISpotifyConnection = {
  id: 73865,
  spotifyURI: 'Metrics',
  refreshToken: 'Ergonomic Corporate Developer',
  accessToken: 'Orchestrator Borders',
  accessTokenExpiresAt: dayjs('2024-02-25T23:49'),
};

export const sampleWithNewData: NewSpotifyConnection = {
  spotifyURI: 'withdrawal',
  refreshToken: 'Universal',
  accessToken: 'primary',
  accessTokenExpiresAt: dayjs('2024-02-25T18:58'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
