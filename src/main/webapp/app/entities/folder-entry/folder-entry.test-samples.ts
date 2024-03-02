import dayjs from 'dayjs/esm';

import { IFolderEntry, NewFolderEntry } from './folder-entry.model';

export const sampleWithRequiredData: IFolderEntry = {
  id: 69242,
  spotifyURI: 'Chicken',
  addTime: dayjs('2024-03-01T04:31'),
};

export const sampleWithPartialData: IFolderEntry = {
  id: 96529,
  spotifyURI: 'Berkshire card deposit',
  addTime: dayjs('2024-02-29T21:39'),
};

export const sampleWithFullData: IFolderEntry = {
  id: 59765,
  spotifyURI: 'wireless Connecticut',
  addTime: dayjs('2024-03-01T08:12'),
};

export const sampleWithNewData: NewFolderEntry = {
  spotifyURI: 'Papua',
  addTime: dayjs('2024-03-01T10:32'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
