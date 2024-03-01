import dayjs from 'dayjs/esm';

import { ITrack, NewTrack } from './track.model';

export const sampleWithRequiredData: ITrack = {
  id: 60514,
  spotifyURI: 'Motorway',
  name: 'Ports cultivate',
  releaseDate: dayjs('2024-02-27'),
  rating: 1658,
};

export const sampleWithPartialData: ITrack = {
  id: 62950,
  spotifyURI: 'Fresh Account',
  name: 'Vanuatu Jersey concept',
  description: 'Fresh connect Lock',
  releaseDate: dayjs('2024-02-27'),
  rating: 87358,
};

export const sampleWithFullData: ITrack = {
  id: 78091,
  spotifyURI: 'International Electronics',
  name: 'Fiji Island green',
  description: 'District Persevering',
  releaseDate: dayjs('2024-02-26'),
  rating: 24419,
};

export const sampleWithNewData: NewTrack = {
  spotifyURI: 'Manager Assistant indexing',
  name: 'Buckinghamshire Radial',
  releaseDate: dayjs('2024-02-27'),
  rating: 17556,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
