import dayjs from 'dayjs/esm';

import { IAlbum, NewAlbum } from './album.model';

export const sampleWithRequiredData: IAlbum = {
  spotifyURI: '84c2f12f-bd04-426e-a855-0d4397e29271',
  name: 'niches Avon Designer',
  totalTracks: 62684,
  releaseDate: dayjs('2024-03-01'),
  rating: 23409,
};

export const sampleWithPartialData: IAlbum = {
  spotifyURI: 'b97fcf30-12e1-4d42-b106-31fefb274650',
  name: 'National withdrawal synthesize',
  totalTracks: 85549,
  releaseDate: dayjs('2024-03-01'),
  rating: 89269,
};

export const sampleWithFullData: IAlbum = {
  spotifyURI: '682a9db1-f01b-4c6a-98f9-8fd585c0894b',
  name: 'Principal PCI PCI',
  totalTracks: 26913,
  releaseDate: dayjs('2024-02-29'),
  rating: 4007,
};

export const sampleWithNewData: NewAlbum = {
  name: 'Bike RAM primary',
  totalTracks: 782,
  releaseDate: dayjs('2024-03-01'),
  rating: 7185,
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
