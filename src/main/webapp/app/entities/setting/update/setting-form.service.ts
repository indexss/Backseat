import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISetting, NewSetting } from '../setting.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISetting for edit and NewSettingFormGroupInput for create.
 */
type SettingFormGroupInput = ISetting | PartialWithRequiredKeyOf<NewSetting>;

type SettingFormDefaults = Pick<NewSetting, 'id'>;

type SettingFormGroupContent = {
  id: FormControl<ISetting['id'] | NewSetting['id']>;
  userID: FormControl<ISetting['userID']>;
  key: FormControl<ISetting['key']>;
  value: FormControl<ISetting['value']>;
};

export type SettingFormGroup = FormGroup<SettingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SettingFormService {
  createSettingFormGroup(setting: SettingFormGroupInput = { id: null }): SettingFormGroup {
    const settingRawValue = {
      ...this.getFormDefaults(),
      ...setting,
    };
    return new FormGroup<SettingFormGroupContent>({
      id: new FormControl(
        { value: settingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      userID: new FormControl(settingRawValue.userID, {
        validators: [Validators.required],
      }),
      key: new FormControl(settingRawValue.key, {
        validators: [Validators.required],
      }),
      value: new FormControl(settingRawValue.value, {
        validators: [Validators.required],
      }),
    });
  }

  getSetting(form: SettingFormGroup): ISetting | NewSetting {
    return form.getRawValue() as ISetting | NewSetting;
  }

  resetForm(form: SettingFormGroup, setting: SettingFormGroupInput): void {
    const settingRawValue = { ...this.getFormDefaults(), ...setting };
    form.reset(
      {
        ...settingRawValue,
        id: { value: settingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SettingFormDefaults {
    return {
      id: null,
    };
  }
}
