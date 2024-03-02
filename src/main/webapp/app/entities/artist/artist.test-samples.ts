import { IArtist, NewArtist } from './artist.model';

export const sampleWithRequiredData: IArtist = {
  spotifyURI: 'bddce956-78f8-48d4-a9d2-db09f88704c9',
  name: 'benchmark',
};

export const sampleWithPartialData: IArtist = {
  spotifyURI: 'e69ea369-3cd0-4b16-b4be-db44ff50284c',
  name: 'generating Research',
};

export const sampleWithFullData: IArtist = {
  spotifyURI: '5ad6138e-1607-45b2-bce9-ce8d31fc6c7e',
  name: 'Divide Saudi',
};

export const sampleWithNewData: NewArtist = {
  name: 'EXE',
  spotifyURI: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
