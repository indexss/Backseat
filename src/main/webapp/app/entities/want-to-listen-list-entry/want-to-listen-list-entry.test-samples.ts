import dayjs from 'dayjs/esm';

import { IWantToListenListEntry, NewWantToListenListEntry } from './want-to-listen-list-entry.model';

export const sampleWithRequiredData: IWantToListenListEntry = {
  id: 47370,
  spotifyURI: 'radical Montana',
  userID: 'Data initiatives',
  addTime: dayjs('2024-02-26T17:35'),
};

export const sampleWithPartialData: IWantToListenListEntry = {
  id: 42922,
  spotifyURI: 'Oro',
  userID: 'Steel',
  addTime: dayjs('2024-02-26T19:17'),
};

export const sampleWithFullData: IWantToListenListEntry = {
  id: 23804,
  spotifyURI: 'hacking Cheese hacking',
  userID: 'Brand',
  addTime: dayjs('2024-02-27T08:32'),
};

export const sampleWithNewData: NewWantToListenListEntry = {
  spotifyURI: 'Sleek enable',
  userID: 'Compatible primary Outdoors',
  addTime: dayjs('2024-02-27T08:52'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
