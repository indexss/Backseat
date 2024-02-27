import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IArtist } from '../artist.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../artist.test-samples';

import { ArtistService } from './artist.service';

const requireRestSample: IArtist = {
  ...sampleWithRequiredData,
};

describe('Artist Service', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;
  let expectedResult: IArtist | IArtist[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ArtistService);
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

    it('should create a Artist', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const artist = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(artist).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Artist', () => {
      const artist = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(artist).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Artist', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Artist', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Artist', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addArtistToCollectionIfMissing', () => {
      it('should add a Artist to an empty array', () => {
        const artist: IArtist = sampleWithRequiredData;
        expectedResult = service.addArtistToCollectionIfMissing([], artist);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(artist);
      });

      it('should not add a Artist to an array that contains it', () => {
        const artist: IArtist = sampleWithRequiredData;
        const artistCollection: IArtist[] = [
          {
            ...artist,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addArtistToCollectionIfMissing(artistCollection, artist);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Artist to an array that doesn't contain it", () => {
        const artist: IArtist = sampleWithRequiredData;
        const artistCollection: IArtist[] = [sampleWithPartialData];
        expectedResult = service.addArtistToCollectionIfMissing(artistCollection, artist);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(artist);
      });

      it('should add only unique Artist to an array', () => {
        const artistArray: IArtist[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const artistCollection: IArtist[] = [sampleWithRequiredData];
        expectedResult = service.addArtistToCollectionIfMissing(artistCollection, ...artistArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const artist: IArtist = sampleWithRequiredData;
        const artist2: IArtist = sampleWithPartialData;
        expectedResult = service.addArtistToCollectionIfMissing([], artist, artist2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(artist);
        expect(expectedResult).toContain(artist2);
      });

      it('should accept null and undefined values', () => {
        const artist: IArtist = sampleWithRequiredData;
        expectedResult = service.addArtistToCollectionIfMissing([], null, artist, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(artist);
      });

      it('should return initial array if no Artist is added', () => {
        const artistCollection: IArtist[] = [sampleWithRequiredData];
        expectedResult = service.addArtistToCollectionIfMissing(artistCollection, undefined, null);
        expect(expectedResult).toEqual(artistCollection);
      });
    });

    describe('compareArtist', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareArtist(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareArtist(entity1, entity2);
        const compareResult2 = service.compareArtist(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareArtist(entity1, entity2);
        const compareResult2 = service.compareArtist(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareArtist(entity1, entity2);
        const compareResult2 = service.compareArtist(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
