import { IArtist, NewArtist } from './artist.model';

export const sampleWithRequiredData: IArtist = {
  id: 70921,
  spotifyURI: 'synthesizing Kentucky Park',
  name: 'Sweden incubate',
};

export const sampleWithPartialData: IArtist = {
  id: 15109,
  spotifyURI: 'driver Operations Avon',
  name: 'Savings Steel e-commerce',
};

export const sampleWithFullData: IArtist = {
  id: 64833,
  spotifyURI: 'engage',
  name: 'up Fantastic paradigm',
};

export const sampleWithNewData: NewArtist = {
  spotifyURI: 'port Strategist Games',
  name: 'calculate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
