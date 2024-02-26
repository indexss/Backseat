import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFollow } from '../follow.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../follow.test-samples';

import { FollowService } from './follow.service';

const requireRestSample: IFollow = {
  ...sampleWithRequiredData,
};

describe('Follow Service', () => {
  let service: FollowService;
  let httpMock: HttpTestingController;
  let expectedResult: IFollow | IFollow[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FollowService);
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

    it('should create a Follow', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const follow = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(follow).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Follow', () => {
      const follow = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(follow).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Follow', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Follow', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Follow', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFollowToCollectionIfMissing', () => {
      it('should add a Follow to an empty array', () => {
        const follow: IFollow = sampleWithRequiredData;
        expectedResult = service.addFollowToCollectionIfMissing([], follow);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(follow);
      });

      it('should not add a Follow to an array that contains it', () => {
        const follow: IFollow = sampleWithRequiredData;
        const followCollection: IFollow[] = [
          {
            ...follow,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFollowToCollectionIfMissing(followCollection, follow);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Follow to an array that doesn't contain it", () => {
        const follow: IFollow = sampleWithRequiredData;
        const followCollection: IFollow[] = [sampleWithPartialData];
        expectedResult = service.addFollowToCollectionIfMissing(followCollection, follow);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(follow);
      });

      it('should add only unique Follow to an array', () => {
        const followArray: IFollow[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const followCollection: IFollow[] = [sampleWithRequiredData];
        expectedResult = service.addFollowToCollectionIfMissing(followCollection, ...followArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const follow: IFollow = sampleWithRequiredData;
        const follow2: IFollow = sampleWithPartialData;
        expectedResult = service.addFollowToCollectionIfMissing([], follow, follow2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(follow);
        expect(expectedResult).toContain(follow2);
      });

      it('should accept null and undefined values', () => {
        const follow: IFollow = sampleWithRequiredData;
        expectedResult = service.addFollowToCollectionIfMissing([], null, follow, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(follow);
      });

      it('should return initial array if no Follow is added', () => {
        const followCollection: IFollow[] = [sampleWithRequiredData];
        expectedResult = service.addFollowToCollectionIfMissing(followCollection, undefined, null);
        expect(expectedResult).toEqual(followCollection);
      });
    });

    describe('compareFollow', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFollow(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFollow(entity1, entity2);
        const compareResult2 = service.compareFollow(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFollow(entity1, entity2);
        const compareResult2 = service.compareFollow(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFollow(entity1, entity2);
        const compareResult2 = service.compareFollow(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
