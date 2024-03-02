import dayjs from 'dayjs/esm';

import { ISpotifyConnection, NewSpotifyConnection } from './spotify-connection.model';

export const sampleWithRequiredData: ISpotifyConnection = {
  spotifyURI: 'f9feda6f-b3f6-402d-b507-4224e3189b9d',
  refreshToken: 'Administrator',
  accessToken: 'zero Group Fords',
  accessTokenExpiresAt: dayjs('2024-03-01T17:39'),
};

export const sampleWithPartialData: ISpotifyConnection = {
  spotifyURI: '39aa48b3-ffbc-411c-a24f-b97fa3785a3a',
  refreshToken: 'dedicated International',
  accessToken: 'Practical internet Manager',
  accessTokenExpiresAt: dayjs('2024-03-01T05:42'),
};

export const sampleWithFullData: ISpotifyConnection = {
  spotifyURI: '872438ea-dcc3-4652-a081-65bfcf13f482',
  refreshToken: 'B2B',
  accessToken: 'Customer incremental',
  accessTokenExpiresAt: dayjs('2024-03-01T04:41'),
};

export const sampleWithNewData: NewSpotifyConnection = {
  refreshToken: 'Loan monitor',
  accessToken: 'Hat Street',
  accessTokenExpiresAt: dayjs('2024-02-29T19:57'),
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
