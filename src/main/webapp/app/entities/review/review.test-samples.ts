import dayjs from 'dayjs/esm';

import { IReview, NewReview } from './review.model';

export const sampleWithRequiredData: IReview = {
  id: 33078,
  rating: 3,
  date: dayjs('2024-03-01T03:10'),
};

export const sampleWithPartialData: IReview = {
  id: 80527,
  rating: 4,
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-03-01T08:37'),
};

export const sampleWithFullData: IReview = {
  id: 55918,
  rating: 1,
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-02-29T21:55'),
};

export const sampleWithNewData: NewReview = {
  rating: 5,
  date: dayjs('2024-02-29T23:07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
