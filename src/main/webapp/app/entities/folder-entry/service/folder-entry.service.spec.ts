import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFolderEntry } from '../folder-entry.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../folder-entry.test-samples';

import { FolderEntryService, RestFolderEntry } from './folder-entry.service';

const requireRestSample: RestFolderEntry = {
  ...sampleWithRequiredData,
  addTime: sampleWithRequiredData.addTime?.toJSON(),
};

describe('FolderEntry Service', () => {
  let service: FolderEntryService;
  let httpMock: HttpTestingController;
  let expectedResult: IFolderEntry | IFolderEntry[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FolderEntryService);
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

    it('should create a FolderEntry', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const folderEntry = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(folderEntry).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FolderEntry', () => {
      const folderEntry = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(folderEntry).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FolderEntry', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FolderEntry', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FolderEntry', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFolderEntryToCollectionIfMissing', () => {
      it('should add a FolderEntry to an empty array', () => {
        const folderEntry: IFolderEntry = sampleWithRequiredData;
        expectedResult = service.addFolderEntryToCollectionIfMissing([], folderEntry);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(folderEntry);
      });

      it('should not add a FolderEntry to an array that contains it', () => {
        const folderEntry: IFolderEntry = sampleWithRequiredData;
        const folderEntryCollection: IFolderEntry[] = [
          {
            ...folderEntry,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFolderEntryToCollectionIfMissing(folderEntryCollection, folderEntry);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FolderEntry to an array that doesn't contain it", () => {
        const folderEntry: IFolderEntry = sampleWithRequiredData;
        const folderEntryCollection: IFolderEntry[] = [sampleWithPartialData];
        expectedResult = service.addFolderEntryToCollectionIfMissing(folderEntryCollection, folderEntry);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(folderEntry);
      });

      it('should add only unique FolderEntry to an array', () => {
        const folderEntryArray: IFolderEntry[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const folderEntryCollection: IFolderEntry[] = [sampleWithRequiredData];
        expectedResult = service.addFolderEntryToCollectionIfMissing(folderEntryCollection, ...folderEntryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const folderEntry: IFolderEntry = sampleWithRequiredData;
        const folderEntry2: IFolderEntry = sampleWithPartialData;
        expectedResult = service.addFolderEntryToCollectionIfMissing([], folderEntry, folderEntry2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(folderEntry);
        expect(expectedResult).toContain(folderEntry2);
      });

      it('should accept null and undefined values', () => {
        const folderEntry: IFolderEntry = sampleWithRequiredData;
        expectedResult = service.addFolderEntryToCollectionIfMissing([], null, folderEntry, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(folderEntry);
      });

      it('should return initial array if no FolderEntry is added', () => {
        const folderEntryCollection: IFolderEntry[] = [sampleWithRequiredData];
        expectedResult = service.addFolderEntryToCollectionIfMissing(folderEntryCollection, undefined, null);
        expect(expectedResult).toEqual(folderEntryCollection);
      });
    });

    describe('compareFolderEntry', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFolderEntry(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFolderEntry(entity1, entity2);
        const compareResult2 = service.compareFolderEntry(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFolderEntry(entity1, entity2);
        const compareResult2 = service.compareFolderEntry(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFolderEntry(entity1, entity2);
        const compareResult2 = service.compareFolderEntry(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
