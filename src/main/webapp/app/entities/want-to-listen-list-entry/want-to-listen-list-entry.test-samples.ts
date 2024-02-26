import dayjs from 'dayjs/esm';

import { IWantToListenListEntry, NewWantToListenListEntry } from './want-to-listen-list-entry.model';

export const sampleWithRequiredData: IWantToListenListEntry = {
  id: 47370,
  spotifyURI: 'radical Montana',
  userID: 'Data initiatives',
  addTime: dayjs('2024-02-25T16:28'),
};

export const sampleWithPartialData: IWantToListenListEntry = {
  id: 42922,
  spotifyURI: 'Oro',
  userID: 'Steel',
  addTime: dayjs('2024-02-25T18:10'),
};

export const sampleWithFullData: IWantToListenListEntry = {
  id: 23804,
  spotifyURI: 'hacking Cheese hacking',
  userID: 'Brand',
  addTime: dayjs('2024-02-26T07:25'),
};

export const sampleWithNewData: NewWantToListenListEntry = {
  spotifyURI: 'Sleek enable',
  userID: 'Compatible primary Outdoors',
  addTime: dayjs('2024-02-26T07:45'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
