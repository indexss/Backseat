import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITrack } from '../track.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../track.test-samples';

import { TrackService, RestTrack } from './track.service';

const requireRestSample: RestTrack = {
  ...sampleWithRequiredData,
  releaseDate: sampleWithRequiredData.releaseDate?.format(DATE_FORMAT),
};

describe('Track Service', () => {
  let service: TrackService;
  let httpMock: HttpTestingController;
  let expectedResult: ITrack | ITrack[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TrackService);
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

    it('should create a Track', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const track = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(track).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Track', () => {
      const track = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(track).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Track', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Track', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Track', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTrackToCollectionIfMissing', () => {
      it('should add a Track to an empty array', () => {
        const track: ITrack = sampleWithRequiredData;
        expectedResult = service.addTrackToCollectionIfMissing([], track);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(track);
      });

      it('should not add a Track to an array that contains it', () => {
        const track: ITrack = sampleWithRequiredData;
        const trackCollection: ITrack[] = [
          {
            ...track,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTrackToCollectionIfMissing(trackCollection, track);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Track to an array that doesn't contain it", () => {
        const track: ITrack = sampleWithRequiredData;
        const trackCollection: ITrack[] = [sampleWithPartialData];
        expectedResult = service.addTrackToCollectionIfMissing(trackCollection, track);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(track);
      });

      it('should add only unique Track to an array', () => {
        const trackArray: ITrack[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const trackCollection: ITrack[] = [sampleWithRequiredData];
        expectedResult = service.addTrackToCollectionIfMissing(trackCollection, ...trackArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const track: ITrack = sampleWithRequiredData;
        const track2: ITrack = sampleWithPartialData;
        expectedResult = service.addTrackToCollectionIfMissing([], track, track2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(track);
        expect(expectedResult).toContain(track2);
      });

      it('should accept null and undefined values', () => {
        const track: ITrack = sampleWithRequiredData;
        expectedResult = service.addTrackToCollectionIfMissing([], null, track, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(track);
      });

      it('should return initial array if no Track is added', () => {
        const trackCollection: ITrack[] = [sampleWithRequiredData];
        expectedResult = service.addTrackToCollectionIfMissing(trackCollection, undefined, null);
        expect(expectedResult).toEqual(trackCollection);
      });
    });

    describe('compareTrack', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTrack(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTrack(entity1, entity2);
        const compareResult2 = service.compareTrack(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTrack(entity1, entity2);
        const compareResult2 = service.compareTrack(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTrack(entity1, entity2);
        const compareResult2 = service.compareTrack(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
