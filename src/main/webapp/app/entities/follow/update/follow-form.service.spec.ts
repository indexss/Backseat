import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../follow.test-samples';

import { FollowFormService } from './follow-form.service';

describe('Follow Form Service', () => {
  let service: FollowFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowFormService);
  });

  describe('Service methods', () => {
    describe('createFollowFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFollowFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceUserID: expect.any(Object),
            targetUserID: expect.any(Object),
          })
        );
      });

      it('passing IFollow should create a new form with FormGroup', () => {
        const formGroup = service.createFollowFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sourceUserID: expect.any(Object),
            targetUserID: expect.any(Object),
          })
        );
      });
    });

    describe('getFollow', () => {
      it('should return NewFollow for default Follow initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFollowFormGroup(sampleWithNewData);

        const follow = service.getFollow(formGroup) as any;

        expect(follow).toMatchObject(sampleWithNewData);
      });

      it('should return NewFollow for empty Follow initial value', () => {
        const formGroup = service.createFollowFormGroup();

        const follow = service.getFollow(formGroup) as any;

        expect(follow).toMatchObject({});
      });

      it('should return IFollow', () => {
        const formGroup = service.createFollowFormGroup(sampleWithRequiredData);

        const follow = service.getFollow(formGroup) as any;

        expect(follow).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFollow should not enable id FormControl', () => {
        const formGroup = service.createFollowFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFollow should disable id FormControl', () => {
        const formGroup = service.createFollowFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
