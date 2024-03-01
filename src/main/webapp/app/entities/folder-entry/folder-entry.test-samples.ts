import dayjs from 'dayjs/esm';

import { IFolderEntry, NewFolderEntry } from './folder-entry.model';

export const sampleWithRequiredData: IFolderEntry = {
  id: 69242,
  spotifyURI: 'Chicken',
  addTime: dayjs('2024-02-27T04:06'),
};

export const sampleWithPartialData: IFolderEntry = {
  id: 96529,
  spotifyURI: 'Berkshire card deposit',
  addTime: dayjs('2024-02-26T21:13'),
};

export const sampleWithFullData: IFolderEntry = {
  id: 59765,
  spotifyURI: 'wireless Connecticut',
  addTime: dayjs('2024-02-27T07:47'),
};

export const sampleWithNewData: NewFolderEntry = {
  spotifyURI: 'Papua',
  addTime: dayjs('2024-02-27T10:07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
