import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFollow, NewFollow } from '../follow.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFollow for edit and NewFollowFormGroupInput for create.
 */
type FollowFormGroupInput = IFollow | PartialWithRequiredKeyOf<NewFollow>;

type FollowFormDefaults = Pick<NewFollow, 'id'>;

type FollowFormGroupContent = {
  id: FormControl<IFollow['id'] | NewFollow['id']>;
  sourceUserID: FormControl<IFollow['sourceUserID']>;
  targetUserID: FormControl<IFollow['targetUserID']>;
};

export type FollowFormGroup = FormGroup<FollowFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FollowFormService {
  createFollowFormGroup(follow: FollowFormGroupInput = { id: null }): FollowFormGroup {
    const followRawValue = {
      ...this.getFormDefaults(),
      ...follow,
    };
    return new FormGroup<FollowFormGroupContent>({
      id: new FormControl(
        { value: followRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sourceUserID: new FormControl(followRawValue.sourceUserID, {
        validators: [Validators.required],
      }),
      targetUserID: new FormControl(followRawValue.targetUserID, {
        validators: [Validators.required],
      }),
    });
  }

  getFollow(form: FollowFormGroup): IFollow | NewFollow {
    return form.getRawValue() as IFollow | NewFollow;
  }

  resetForm(form: FollowFormGroup, follow: FollowFormGroupInput): void {
    const followRawValue = { ...this.getFormDefaults(), ...follow };
    form.reset(
      {
        ...followRawValue,
        id: { value: followRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FollowFormDefaults {
    return {
      id: null,
    };
  }
}
