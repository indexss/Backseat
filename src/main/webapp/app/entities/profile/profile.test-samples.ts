import { IProfile, NewProfile } from './profile.model';

export const sampleWithRequiredData: IProfile = {
  id: 11865,
  username: 'generating solid Unions',
  spotifyURI: 'Concrete',
};

export const sampleWithPartialData: IProfile = {
  id: 88241,
  username: 'SQL task-force feed',
  spotifyURI: 'synergy',
};

export const sampleWithFullData: IProfile = {
  id: 65468,
  username: 'index',
  spotifyURI: 'disintermediate',
  profilePhoto: '../fake-data/blob/hipster.png',
  profilePhotoContentType: 'unknown',
};

export const sampleWithNewData: NewProfile = {
  username: 'Auto synthesizing Computer',
  spotifyURI: 'Assistant solutions',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
