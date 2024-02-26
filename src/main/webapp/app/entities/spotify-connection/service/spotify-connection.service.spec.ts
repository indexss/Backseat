import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISpotifyConnection } from '../spotify-connection.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../spotify-connection.test-samples';

import { SpotifyConnectionService, RestSpotifyConnection } from './spotify-connection.service';

const requireRestSample: RestSpotifyConnection = {
  ...sampleWithRequiredData,
  accessTokenExpiresAt: sampleWithRequiredData.accessTokenExpiresAt?.toJSON(),
};

describe('SpotifyConnection Service', () => {
  let service: SpotifyConnectionService;
  let httpMock: HttpTestingController;
  let expectedResult: ISpotifyConnection | ISpotifyConnection[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SpotifyConnectionService);
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

    it('should create a SpotifyConnection', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const spotifyConnection = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(spotifyConnection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SpotifyConnection', () => {
      const spotifyConnection = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(spotifyConnection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SpotifyConnection', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SpotifyConnection', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SpotifyConnection', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSpotifyConnectionToCollectionIfMissing', () => {
      it('should add a SpotifyConnection to an empty array', () => {
        const spotifyConnection: ISpotifyConnection = sampleWithRequiredData;
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing([], spotifyConnection);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(spotifyConnection);
      });

      it('should not add a SpotifyConnection to an array that contains it', () => {
        const spotifyConnection: ISpotifyConnection = sampleWithRequiredData;
        const spotifyConnectionCollection: ISpotifyConnection[] = [
          {
            ...spotifyConnection,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing(spotifyConnectionCollection, spotifyConnection);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SpotifyConnection to an array that doesn't contain it", () => {
        const spotifyConnection: ISpotifyConnection = sampleWithRequiredData;
        const spotifyConnectionCollection: ISpotifyConnection[] = [sampleWithPartialData];
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing(spotifyConnectionCollection, spotifyConnection);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(spotifyConnection);
      });

      it('should add only unique SpotifyConnection to an array', () => {
        const spotifyConnectionArray: ISpotifyConnection[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const spotifyConnectionCollection: ISpotifyConnection[] = [sampleWithRequiredData];
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing(spotifyConnectionCollection, ...spotifyConnectionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const spotifyConnection: ISpotifyConnection = sampleWithRequiredData;
        const spotifyConnection2: ISpotifyConnection = sampleWithPartialData;
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing([], spotifyConnection, spotifyConnection2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(spotifyConnection);
        expect(expectedResult).toContain(spotifyConnection2);
      });

      it('should accept null and undefined values', () => {
        const spotifyConnection: ISpotifyConnection = sampleWithRequiredData;
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing([], null, spotifyConnection, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(spotifyConnection);
      });

      it('should return initial array if no SpotifyConnection is added', () => {
        const spotifyConnectionCollection: ISpotifyConnection[] = [sampleWithRequiredData];
        expectedResult = service.addSpotifyConnectionToCollectionIfMissing(spotifyConnectionCollection, undefined, null);
        expect(expectedResult).toEqual(spotifyConnectionCollection);
      });
    });

    describe('compareSpotifyConnection', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSpotifyConnection(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSpotifyConnection(entity1, entity2);
        const compareResult2 = service.compareSpotifyConnection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSpotifyConnection(entity1, entity2);
        const compareResult2 = service.compareSpotifyConnection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSpotifyConnection(entity1, entity2);
        const compareResult2 = service.compareSpotifyConnection(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
