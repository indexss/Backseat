import dayjs from 'dayjs/esm';

import { IAlbum, NewAlbum } from './album.model';

export const sampleWithRequiredData: IAlbum = {
  id: 51589,
  spotifyURI: 'back-end',
  name: 'Chips',
  totalTracks: 81956,
  releaseDate: dayjs('2024-02-26'),
  rating: 26055,
};

export const sampleWithPartialData: IAlbum = {
  id: 43494,
  spotifyURI: 'deliver value-added loyalty',
  name: 'Corporate Shoes',
  totalTracks: 77164,
  releaseDate: dayjs('2024-02-26'),
  rating: 38216,
};

export const sampleWithFullData: IAlbum = {
  id: 71559,
  spotifyURI: 'Frozen Home',
  name: 'Account parse Music',
  totalTracks: 87624,
  description: 'compressing',
  releaseDate: dayjs('2024-02-26'),
  rating: 9622,
};

export const sampleWithNewData: NewAlbum = {
  spotifyURI: 'enhance',
  name: 'Chief turquoise action-items',
  totalTracks: 81649,
  releaseDate: dayjs('2024-02-25'),
  rating: 34898,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
