import { IFollow, NewFollow } from './follow.model';

export const sampleWithRequiredData: IFollow = {
  id: 15849,
  sourceUserID: 'indigo framework',
  targetUserID: 'Silver calculating',
};

export const sampleWithPartialData: IFollow = {
  id: 6010,
  sourceUserID: 'Avon content-based',
  targetUserID: 'neural-net open-source',
};

export const sampleWithFullData: IFollow = {
  id: 32150,
  sourceUserID: 'Developer red XML',
  targetUserID: 'Industrial',
};

export const sampleWithNewData: NewFollow = {
  sourceUserID: 'matrix Frozen architect',
  targetUserID: 'Minnesota',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
