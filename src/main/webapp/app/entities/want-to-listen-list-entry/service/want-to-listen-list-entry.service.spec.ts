import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../want-to-listen-list-entry.test-samples';

import { WantToListenListEntryService, RestWantToListenListEntry } from './want-to-listen-list-entry.service';

const requireRestSample: RestWantToListenListEntry = {
  ...sampleWithRequiredData,
  addTime: sampleWithRequiredData.addTime?.toJSON(),
};

describe('WantToListenListEntry Service', () => {
  let service: WantToListenListEntryService;
  let httpMock: HttpTestingController;
  let expectedResult: IWantToListenListEntry | IWantToListenListEntry[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WantToListenListEntryService);
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

    it('should create a WantToListenListEntry', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const wantToListenListEntry = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(wantToListenListEntry).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WantToListenListEntry', () => {
      const wantToListenListEntry = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(wantToListenListEntry).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WantToListenListEntry', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WantToListenListEntry', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WantToListenListEntry', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWantToListenListEntryToCollectionIfMissing', () => {
      it('should add a WantToListenListEntry to an empty array', () => {
        const wantToListenListEntry: IWantToListenListEntry = sampleWithRequiredData;
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing([], wantToListenListEntry);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wantToListenListEntry);
      });

      it('should not add a WantToListenListEntry to an array that contains it', () => {
        const wantToListenListEntry: IWantToListenListEntry = sampleWithRequiredData;
        const wantToListenListEntryCollection: IWantToListenListEntry[] = [
          {
            ...wantToListenListEntry,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing(wantToListenListEntryCollection, wantToListenListEntry);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WantToListenListEntry to an array that doesn't contain it", () => {
        const wantToListenListEntry: IWantToListenListEntry = sampleWithRequiredData;
        const wantToListenListEntryCollection: IWantToListenListEntry[] = [sampleWithPartialData];
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing(wantToListenListEntryCollection, wantToListenListEntry);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wantToListenListEntry);
      });

      it('should add only unique WantToListenListEntry to an array', () => {
        const wantToListenListEntryArray: IWantToListenListEntry[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const wantToListenListEntryCollection: IWantToListenListEntry[] = [sampleWithRequiredData];
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing(
          wantToListenListEntryCollection,
          ...wantToListenListEntryArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const wantToListenListEntry: IWantToListenListEntry = sampleWithRequiredData;
        const wantToListenListEntry2: IWantToListenListEntry = sampleWithPartialData;
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing([], wantToListenListEntry, wantToListenListEntry2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wantToListenListEntry);
        expect(expectedResult).toContain(wantToListenListEntry2);
      });

      it('should accept null and undefined values', () => {
        const wantToListenListEntry: IWantToListenListEntry = sampleWithRequiredData;
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing([], null, wantToListenListEntry, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wantToListenListEntry);
      });

      it('should return initial array if no WantToListenListEntry is added', () => {
        const wantToListenListEntryCollection: IWantToListenListEntry[] = [sampleWithRequiredData];
        expectedResult = service.addWantToListenListEntryToCollectionIfMissing(wantToListenListEntryCollection, undefined, null);
        expect(expectedResult).toEqual(wantToListenListEntryCollection);
      });
    });

    describe('compareWantToListenListEntry', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWantToListenListEntry(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWantToListenListEntry(entity1, entity2);
        const compareResult2 = service.compareWantToListenListEntry(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWantToListenListEntry(entity1, entity2);
        const compareResult2 = service.compareWantToListenListEntry(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWantToListenListEntry(entity1, entity2);
        const compareResult2 = service.compareWantToListenListEntry(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
