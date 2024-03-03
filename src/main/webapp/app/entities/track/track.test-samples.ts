import dayjs from 'dayjs/esm';

import { ITrack, NewTrack } from './track.model';

export const sampleWithRequiredData: ITrack = {
  spotifyURI: '9278777a-e6e2-470b-aa2d-996fd8ff8755',
  name: 'Salad',
  releaseDate: dayjs('2024-02-29'),
  rating: 46590,
};

export const sampleWithPartialData: ITrack = {
  spotifyURI: '87706dc8-eb60-43cb-8448-6431aae6a399',
  name: 'User-centric Reduced multi-byte',
  releaseDate: dayjs('2024-03-01'),
  rating: 15282,
};

export const sampleWithFullData: ITrack = {
  spotifyURI: '67ab7a88-2a9e-4384-85aa-af6ac7454775',
  name: 'SSL',
  releaseDate: dayjs('2024-03-01'),
  rating: 82473,
};

export const sampleWithNewData: NewTrack = {
  name: 'Sharable',
  releaseDate: dayjs('2024-02-29'),
  rating: 25508,
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
