import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../spotify-connection.test-samples';

import { SpotifyConnectionFormService } from './spotify-connection-form.service';

describe('SpotifyConnection Form Service', () => {
  let service: SpotifyConnectionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyConnectionFormService);
  });

  describe('Service methods', () => {
    describe('createSpotifyConnectionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSpotifyConnectionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            spotifyURI: expect.any(Object),
            refreshToken: expect.any(Object),
            accessToken: expect.any(Object),
            accessTokenExpiresAt: expect.any(Object),
          })
        );
      });

      it('passing ISpotifyConnection should create a new form with FormGroup', () => {
        const formGroup = service.createSpotifyConnectionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            spotifyURI: expect.any(Object),
            refreshToken: expect.any(Object),
            accessToken: expect.any(Object),
            accessTokenExpiresAt: expect.any(Object),
          })
        );
      });
    });

    describe('getSpotifyConnection', () => {
      it('should return NewSpotifyConnection for default SpotifyConnection initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSpotifyConnectionFormGroup(sampleWithNewData);

        const spotifyConnection = service.getSpotifyConnection(formGroup) as any;

        expect(spotifyConnection).toMatchObject(sampleWithNewData);
      });

      it('should return NewSpotifyConnection for empty SpotifyConnection initial value', () => {
        const formGroup = service.createSpotifyConnectionFormGroup();

        const spotifyConnection = service.getSpotifyConnection(formGroup) as any;

        expect(spotifyConnection).toMatchObject({});
      });

      it('should return ISpotifyConnection', () => {
        const formGroup = service.createSpotifyConnectionFormGroup(sampleWithRequiredData);

        const spotifyConnection = service.getSpotifyConnection(formGroup) as any;

        expect(spotifyConnection).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISpotifyConnection should not enable spotifyURI FormControl', () => {
        const formGroup = service.createSpotifyConnectionFormGroup();
        expect(formGroup.controls.spotifyURI.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.spotifyURI.disabled).toBe(true);
      });

      it('passing NewSpotifyConnection should disable spotifyURI FormControl', () => {
        const formGroup = service.createSpotifyConnectionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.spotifyURI.disabled).toBe(true);

        service.resetForm(formGroup, { spotifyURI: null });

        expect(formGroup.controls.spotifyURI.disabled).toBe(true);
      });
    });
  });
});
