import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWantToListenListEntry, NewWantToListenListEntry } from '../want-to-listen-list-entry.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWantToListenListEntry for edit and NewWantToListenListEntryFormGroupInput for create.
 */
type WantToListenListEntryFormGroupInput = IWantToListenListEntry | PartialWithRequiredKeyOf<NewWantToListenListEntry>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWantToListenListEntry | NewWantToListenListEntry> = Omit<T, 'addTime'> & {
  addTime?: string | null;
};

type WantToListenListEntryFormRawValue = FormValueOf<IWantToListenListEntry>;

type NewWantToListenListEntryFormRawValue = FormValueOf<NewWantToListenListEntry>;

type WantToListenListEntryFormDefaults = Pick<NewWantToListenListEntry, 'id' | 'addTime'>;

type WantToListenListEntryFormGroupContent = {
  id: FormControl<WantToListenListEntryFormRawValue['id'] | NewWantToListenListEntry['id']>;
  spotifyURI: FormControl<WantToListenListEntryFormRawValue['spotifyURI']>;
  userID: FormControl<WantToListenListEntryFormRawValue['userID']>;
  addTime: FormControl<WantToListenListEntryFormRawValue['addTime']>;
};

export type WantToListenListEntryFormGroup = FormGroup<WantToListenListEntryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WantToListenListEntryFormService {
  createWantToListenListEntryFormGroup(
    wantToListenListEntry: WantToListenListEntryFormGroupInput = { id: null }
  ): WantToListenListEntryFormGroup {
    const wantToListenListEntryRawValue = this.convertWantToListenListEntryToWantToListenListEntryRawValue({
      ...this.getFormDefaults(),
      ...wantToListenListEntry,
    });
    return new FormGroup<WantToListenListEntryFormGroupContent>({
      id: new FormControl(
        { value: wantToListenListEntryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      spotifyURI: new FormControl(wantToListenListEntryRawValue.spotifyURI, {
        validators: [Validators.required],
      }),
      userID: new FormControl(wantToListenListEntryRawValue.userID, {
        validators: [Validators.required],
      }),
      addTime: new FormControl(wantToListenListEntryRawValue.addTime, {
        validators: [Validators.required],
      }),
    });
  }

  getWantToListenListEntry(form: WantToListenListEntryFormGroup): IWantToListenListEntry | NewWantToListenListEntry {
    return this.convertWantToListenListEntryRawValueToWantToListenListEntry(
      form.getRawValue() as WantToListenListEntryFormRawValue | NewWantToListenListEntryFormRawValue
    );
  }

  resetForm(form: WantToListenListEntryFormGroup, wantToListenListEntry: WantToListenListEntryFormGroupInput): void {
    const wantToListenListEntryRawValue = this.convertWantToListenListEntryToWantToListenListEntryRawValue({
      ...this.getFormDefaults(),
      ...wantToListenListEntry,
    });
    form.reset(
      {
        ...wantToListenListEntryRawValue,
        id: { value: wantToListenListEntryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WantToListenListEntryFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      addTime: currentTime,
    };
  }

  private convertWantToListenListEntryRawValueToWantToListenListEntry(
    rawWantToListenListEntry: WantToListenListEntryFormRawValue | NewWantToListenListEntryFormRawValue
  ): IWantToListenListEntry | NewWantToListenListEntry {
    return {
      ...rawWantToListenListEntry,
      addTime: dayjs(rawWantToListenListEntry.addTime, DATE_TIME_FORMAT),
    };
  }

  private convertWantToListenListEntryToWantToListenListEntryRawValue(
    wantToListenListEntry: IWantToListenListEntry | (Partial<NewWantToListenListEntry> & WantToListenListEntryFormDefaults)
  ): WantToListenListEntryFormRawValue | PartialWithRequiredKeyOf<NewWantToListenListEntryFormRawValue> {
    return {
      ...wantToListenListEntry,
      addTime: wantToListenListEntry.addTime ? wantToListenListEntry.addTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
