import { IFolder, NewFolder } from './folder.model';

export const sampleWithRequiredData: IFolder = {
  id: 27613,
  name: 'Shores dynamic',
};

export const sampleWithPartialData: IFolder = {
  id: 34904,
  name: 'Minnesota deposit Sudanese',
  imagePath: '../fake-data/blob/hipster.png',
  imagePathContentType: 'unknown',
};

export const sampleWithFullData: IFolder = {
  id: 23172,
  name: 'redundant Stand-alone Bedfordshire',
  imagePath: '../fake-data/blob/hipster.png',
  imagePathContentType: 'unknown',
};

export const sampleWithNewData: NewFolder = {
  name: '24/7 payment matrix',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
