import { ISetting, NewSetting } from './setting.model';

export const sampleWithRequiredData: ISetting = {
  id: 51292,
  userID: 'composite',
  key: 'Aruban Table 1080p',
  value: 'indigo',
};

export const sampleWithPartialData: ISetting = {
  id: 16894,
  userID: 'Checking didactic',
  key: 'tan SCSI vortals',
  value: 'Rubber',
};

export const sampleWithFullData: ISetting = {
  id: 97687,
  userID: 'Djibouti bluetooth',
  key: 'red application',
  value: 'Mandatory Pound encryption',
};

export const sampleWithNewData: NewSetting = {
  userID: 'Program Usability Progressive',
  key: 'Movies',
  value: 'Rupee',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
