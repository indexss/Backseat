import dayjs from 'dayjs/esm';

import { ISpotifyConnection, NewSpotifyConnection } from './spotify-connection.model';

export const sampleWithRequiredData: ISpotifyConnection = {
  spotifyURI: 'f9feda6f-b3f6-402d-b507-4224e3189b9d',
  accessToken: 'Administrator',
  accessTokenExpiresAt: dayjs('2024-02-29T18:37'),
};

export const sampleWithPartialData: ISpotifyConnection = {
  spotifyURI: 'f3f6c738-039a-4a48-b3ff-bc11ce24fb97',
  accessToken: 'deposit Greece Profit-focused',
  accessTokenExpiresAt: dayjs('2024-03-01T11:28'),
};

export const sampleWithFullData: ISpotifyConnection = {
  spotifyURI: '43eb2d16-e484-4f3e-8872-438eadcc3652',
  refreshToken: 'Steel Palladium',
  accessToken: 'Intelligent Object-based Plastic',
  accessTokenExpiresAt: dayjs('2024-03-01T17:11'),
};

export const sampleWithNewData: NewSpotifyConnection = {
  accessToken: 'Customer incremental',
  accessTokenExpiresAt: dayjs('2024-03-01T04:41'),
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
