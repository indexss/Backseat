import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAlbum } from '../album.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../album.test-samples';

import { AlbumService, RestAlbum } from './album.service';

const requireRestSample: RestAlbum = {
  ...sampleWithRequiredData,
  releaseDate: sampleWithRequiredData.releaseDate?.format(DATE_FORMAT),
};

describe('Album Service', () => {
  let service: AlbumService;
  let httpMock: HttpTestingController;
  let expectedResult: IAlbum | IAlbum[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlbumService);
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

    it('should create a Album', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const album = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(album).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Album', () => {
      const album = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(album).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Album', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Album', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Album', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAlbumToCollectionIfMissing', () => {
      it('should add a Album to an empty array', () => {
        const album: IAlbum = sampleWithRequiredData;
        expectedResult = service.addAlbumToCollectionIfMissing([], album);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(album);
      });

      it('should not add a Album to an array that contains it', () => {
        const album: IAlbum = sampleWithRequiredData;
        const albumCollection: IAlbum[] = [
          {
            ...album,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAlbumToCollectionIfMissing(albumCollection, album);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Album to an array that doesn't contain it", () => {
        const album: IAlbum = sampleWithRequiredData;
        const albumCollection: IAlbum[] = [sampleWithPartialData];
        expectedResult = service.addAlbumToCollectionIfMissing(albumCollection, album);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(album);
      });

      it('should add only unique Album to an array', () => {
        const albumArray: IAlbum[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const albumCollection: IAlbum[] = [sampleWithRequiredData];
        expectedResult = service.addAlbumToCollectionIfMissing(albumCollection, ...albumArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const album: IAlbum = sampleWithRequiredData;
        const album2: IAlbum = sampleWithPartialData;
        expectedResult = service.addAlbumToCollectionIfMissing([], album, album2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(album);
        expect(expectedResult).toContain(album2);
      });

      it('should accept null and undefined values', () => {
        const album: IAlbum = sampleWithRequiredData;
        expectedResult = service.addAlbumToCollectionIfMissing([], null, album, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(album);
      });

      it('should return initial array if no Album is added', () => {
        const albumCollection: IAlbum[] = [sampleWithRequiredData];
        expectedResult = service.addAlbumToCollectionIfMissing(albumCollection, undefined, null);
        expect(expectedResult).toEqual(albumCollection);
      });
    });

    describe('compareAlbum', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAlbum(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAlbum(entity1, entity2);
        const compareResult2 = service.compareAlbum(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAlbum(entity1, entity2);
        const compareResult2 = service.compareAlbum(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAlbum(entity1, entity2);
        const compareResult2 = service.compareAlbum(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
