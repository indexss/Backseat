import dayjs from 'dayjs/esm';

import { ITrack, NewTrack } from './track.model';

export const sampleWithRequiredData: ITrack = {
  spotifyURI: '9278777a-e6e2-470b-aa2d-996fd8ff8755',
  name: 'Salad',
  releaseDate: dayjs('2024-02-29'),
  rating: 46590,
};

export const sampleWithPartialData: ITrack = {
  spotifyURI: '7706dc8e-b603-4cb8-8486-431aae6a399f',
  name: 'Usability',
  description: 'Assistant indexing supply-chains',
  releaseDate: dayjs('2024-03-01'),
  rating: 47420,
};

export const sampleWithFullData: ITrack = {
  spotifyURI: 'a882a9e3-8405-4aaa-b6ac-74547754e38a',
  name: 'context-sensitive Cambridgeshire scale',
  description: 'needs-based Secured Buckinghamshire',
  releaseDate: dayjs('2024-02-29'),
  rating: 41925,
};

export const sampleWithNewData: NewTrack = {
  name: 'Bedfordshire infomediaries Kyat',
  releaseDate: dayjs('2024-02-29'),
  rating: 51105,
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
