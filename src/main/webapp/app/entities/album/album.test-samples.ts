import dayjs from 'dayjs/esm';

import { IAlbum, NewAlbum } from './album.model';

export const sampleWithRequiredData: IAlbum = {
  spotifyURI: '84c2f12f-bd04-426e-a855-0d4397e29271',
  name: 'niches Avon Designer',
  totalTracks: 62684,
  releaseDate: dayjs('2024-03-01'),
  rating: 23409,
  imageURL: 'Account parse Music',
};

export const sampleWithPartialData: IAlbum = {
  spotifyURI: 'e1d42310-631f-4efb-a746-50de52a5dbb4',
  name: 'Unbranded payment Dinar',
  totalTracks: 2186,
  releaseDate: dayjs('2024-03-01'),
  rating: 74077,
  imageURL: 'reintermediate Zimbabwe Islands',
};

export const sampleWithFullData: IAlbum = {
  spotifyURI: '585c0894-bcef-4bd5-8d59-4f0c236d1bc1',
  name: 'Home',
  totalTracks: 19092,
  releaseDate: dayjs('2024-03-01'),
  rating: 6037,
  imageURL: 'Gloves',
};

export const sampleWithNewData: NewAlbum = {
  name: 'parse',
  totalTracks: 13010,
  releaseDate: dayjs('2024-02-29'),
  rating: 98707,
  imageURL: 'seize',
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
