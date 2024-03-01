import dayjs from 'dayjs/esm';

import { IReview, NewReview } from './review.model';

export const sampleWithRequiredData: IReview = {
  id: 33078,
  rating: 3,
  date: dayjs('2024-02-27T02:44'),
};

export const sampleWithPartialData: IReview = {
  id: 80527,
  rating: 4,
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-02-27T08:12'),
};

export const sampleWithFullData: IReview = {
  id: 55918,
  rating: 1,
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-02-26T21:30'),
};

export const sampleWithNewData: NewReview = {
  rating: 5,
  date: dayjs('2024-02-26T22:42'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
