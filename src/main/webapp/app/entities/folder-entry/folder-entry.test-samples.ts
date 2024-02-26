import dayjs from 'dayjs/esm';

import { IFolderEntry, NewFolderEntry } from './folder-entry.model';

export const sampleWithRequiredData: IFolderEntry = {
  id: 69242,
  folderID: 'Chicken',
  spotifyURI: 'Representative Freeway',
  addTime: dayjs('2024-02-26T07:47'),
};

export const sampleWithPartialData: IFolderEntry = {
  id: 48401,
  folderID: 'Toys Account',
  spotifyURI: 'Home maroon Papua',
  addTime: dayjs('2024-02-26T08:02'),
};

export const sampleWithFullData: IFolderEntry = {
  id: 99575,
  folderID: 'Hungary',
  spotifyURI: 'AGP Gloves',
  addTime: dayjs('2024-02-26T03:54'),
};

export const sampleWithNewData: NewFolderEntry = {
  folderID: 'Vision-oriented magenta',
  spotifyURI: 'Cambridgeshire',
  addTime: dayjs('2024-02-26T11:57'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
