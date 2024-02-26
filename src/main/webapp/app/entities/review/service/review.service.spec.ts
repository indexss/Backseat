import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReview } from '../review.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../review.test-samples';

import { ReviewService, RestReview } from './review.service';

const requireRestSample: RestReview = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.toJSON(),
};

describe('Review Service', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;
  let expectedResult: IReview | IReview[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Review', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const review = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(review).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Review', () => {
      const review = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(review).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Review', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Review', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Review', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReviewToCollectionIfMissing', () => {
      it('should add a Review to an empty array', () => {
        const review: IReview = sampleWithRequiredData;
        expectedResult = service.addReviewToCollectionIfMissing([], review);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(review);
      });

      it('should not add a Review to an array that contains it', () => {
        const review: IReview = sampleWithRequiredData;
        const reviewCollection: IReview[] = [
          {
            ...review,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReviewToCollectionIfMissing(reviewCollection, review);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Review to an array that doesn't contain it", () => {
        const review: IReview = sampleWithRequiredData;
        const reviewCollection: IReview[] = [sampleWithPartialData];
        expectedResult = service.addReviewToCollectionIfMissing(reviewCollection, review);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(review);
      });

      it('should add only unique Review to an array', () => {
        const reviewArray: IReview[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reviewCollection: IReview[] = [sampleWithRequiredData];
        expectedResult = service.addReviewToCollectionIfMissing(reviewCollection, ...reviewArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const review: IReview = sampleWithRequiredData;
        const review2: IReview = sampleWithPartialData;
        expectedResult = service.addReviewToCollectionIfMissing([], review, review2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(review);
        expect(expectedResult).toContain(review2);
      });

      it('should accept null and undefined values', () => {
        const review: IReview = sampleWithRequiredData;
        expectedResult = service.addReviewToCollectionIfMissing([], null, review, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(review);
      });

      it('should return initial array if no Review is added', () => {
        const reviewCollection: IReview[] = [sampleWithRequiredData];
        expectedResult = service.addReviewToCollectionIfMissing(reviewCollection, undefined, null);
        expect(expectedResult).toEqual(reviewCollection);
      });
    });

    describe('compareReview', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReview(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReview(entity1, entity2);
        const compareResult2 = service.compareReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReview(entity1, entity2);
        const compareResult2 = service.compareReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReview(entity1, entity2);
        const compareResult2 = service.compareReview(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
