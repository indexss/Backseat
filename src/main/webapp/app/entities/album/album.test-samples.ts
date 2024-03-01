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
  spotifyURI: '97fcf301-2e1d-4423-9063-1fefb274650d',
  name: 'mission-critical cutting-edge Sterling',
  totalTracks: 6876,
  description: 'synthesize payment Dinar',
  releaseDate: dayjs('2024-03-01'),
  rating: 8712,
};

export const sampleWithFullData: IAlbum = {
  spotifyURI: 'bc6ad8f9-8fd5-485c-8894-bcefbd5cd594',
  name: 'Wooden RAM primary',
  totalTracks: 782,
  description: 'Intelligent',
  releaseDate: dayjs('2024-03-01'),
  rating: 30563,
};

export const sampleWithNewData: NewAlbum = {
  name: 'ivory',
  totalTracks: 57301,
  releaseDate: dayjs('2024-03-01'),
  rating: 82581,
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
