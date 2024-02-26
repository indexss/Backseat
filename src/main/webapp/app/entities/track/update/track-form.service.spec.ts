import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../track.test-samples';

import { TrackFormService } from './track-form.service';

describe('Track Form Service', () => {
  let service: TrackFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackFormService);
  });

  describe('Service methods', () => {
    describe('createTrackFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTrackFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            spotifyURI: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            releaseDate: expect.any(Object),
            rating: expect.any(Object),
            artists: expect.any(Object),
            album: expect.any(Object),
          })
        );
      });

      it('passing ITrack should create a new form with FormGroup', () => {
        const formGroup = service.createTrackFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            spotifyURI: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            releaseDate: expect.any(Object),
            rating: expect.any(Object),
            artists: expect.any(Object),
            album: expect.any(Object),
          })
        );
      });
    });

    describe('getTrack', () => {
      it('should return NewTrack for default Track initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTrackFormGroup(sampleWithNewData);

        const track = service.getTrack(formGroup) as any;

        expect(track).toMatchObject(sampleWithNewData);
      });

      it('should return NewTrack for empty Track initial value', () => {
        const formGroup = service.createTrackFormGroup();

        const track = service.getTrack(formGroup) as any;

        expect(track).toMatchObject({});
      });

      it('should return ITrack', () => {
        const formGroup = service.createTrackFormGroup(sampleWithRequiredData);

        const track = service.getTrack(formGroup) as any;

        expect(track).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITrack should not enable id FormControl', () => {
        const formGroup = service.createTrackFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTrack should disable id FormControl', () => {
        const formGroup = service.createTrackFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
