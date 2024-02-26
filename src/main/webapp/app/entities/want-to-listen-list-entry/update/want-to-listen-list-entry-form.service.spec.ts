import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../want-to-listen-list-entry.test-samples';

import { WantToListenListEntryFormService } from './want-to-listen-list-entry-form.service';

describe('WantToListenListEntry Form Service', () => {
  let service: WantToListenListEntryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WantToListenListEntryFormService);
  });

  describe('Service methods', () => {
    describe('createWantToListenListEntryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWantToListenListEntryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            spotifyURI: expect.any(Object),
            userID: expect.any(Object),
            addTime: expect.any(Object),
          })
        );
      });

      it('passing IWantToListenListEntry should create a new form with FormGroup', () => {
        const formGroup = service.createWantToListenListEntryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            spotifyURI: expect.any(Object),
            userID: expect.any(Object),
            addTime: expect.any(Object),
          })
        );
      });
    });

    describe('getWantToListenListEntry', () => {
      it('should return NewWantToListenListEntry for default WantToListenListEntry initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWantToListenListEntryFormGroup(sampleWithNewData);

        const wantToListenListEntry = service.getWantToListenListEntry(formGroup) as any;

        expect(wantToListenListEntry).toMatchObject(sampleWithNewData);
      });

      it('should return NewWantToListenListEntry for empty WantToListenListEntry initial value', () => {
        const formGroup = service.createWantToListenListEntryFormGroup();

        const wantToListenListEntry = service.getWantToListenListEntry(formGroup) as any;

        expect(wantToListenListEntry).toMatchObject({});
      });

      it('should return IWantToListenListEntry', () => {
        const formGroup = service.createWantToListenListEntryFormGroup(sampleWithRequiredData);

        const wantToListenListEntry = service.getWantToListenListEntry(formGroup) as any;

        expect(wantToListenListEntry).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWantToListenListEntry should not enable id FormControl', () => {
        const formGroup = service.createWantToListenListEntryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWantToListenListEntry should disable id FormControl', () => {
        const formGroup = service.createWantToListenListEntryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
