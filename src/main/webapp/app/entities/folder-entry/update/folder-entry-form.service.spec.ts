import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../folder-entry.test-samples';

import { FolderEntryFormService } from './folder-entry-form.service';

describe('FolderEntry Form Service', () => {
  let service: FolderEntryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderEntryFormService);
  });

  describe('Service methods', () => {
    describe('createFolderEntryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFolderEntryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            folderID: expect.any(Object),
            spotifyURI: expect.any(Object),
            addTime: expect.any(Object),
            folder: expect.any(Object),
          })
        );
      });

      it('passing IFolderEntry should create a new form with FormGroup', () => {
        const formGroup = service.createFolderEntryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            folderID: expect.any(Object),
            spotifyURI: expect.any(Object),
            addTime: expect.any(Object),
            folder: expect.any(Object),
          })
        );
      });
    });

    describe('getFolderEntry', () => {
      it('should return NewFolderEntry for default FolderEntry initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFolderEntryFormGroup(sampleWithNewData);

        const folderEntry = service.getFolderEntry(formGroup) as any;

        expect(folderEntry).toMatchObject(sampleWithNewData);
      });

      it('should return NewFolderEntry for empty FolderEntry initial value', () => {
        const formGroup = service.createFolderEntryFormGroup();

        const folderEntry = service.getFolderEntry(formGroup) as any;

        expect(folderEntry).toMatchObject({});
      });

      it('should return IFolderEntry', () => {
        const formGroup = service.createFolderEntryFormGroup(sampleWithRequiredData);

        const folderEntry = service.getFolderEntry(formGroup) as any;

        expect(folderEntry).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFolderEntry should not enable id FormControl', () => {
        const formGroup = service.createFolderEntryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFolderEntry should disable id FormControl', () => {
        const formGroup = service.createFolderEntryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
