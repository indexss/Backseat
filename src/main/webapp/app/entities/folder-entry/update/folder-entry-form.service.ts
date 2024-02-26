import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFolderEntry, NewFolderEntry } from '../folder-entry.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFolderEntry for edit and NewFolderEntryFormGroupInput for create.
 */
type FolderEntryFormGroupInput = IFolderEntry | PartialWithRequiredKeyOf<NewFolderEntry>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFolderEntry | NewFolderEntry> = Omit<T, 'addTime'> & {
  addTime?: string | null;
};

type FolderEntryFormRawValue = FormValueOf<IFolderEntry>;

type NewFolderEntryFormRawValue = FormValueOf<NewFolderEntry>;

type FolderEntryFormDefaults = Pick<NewFolderEntry, 'id' | 'addTime' | 'tracks' | 'albums'>;

type FolderEntryFormGroupContent = {
  id: FormControl<FolderEntryFormRawValue['id'] | NewFolderEntry['id']>;
  folderID: FormControl<FolderEntryFormRawValue['folderID']>;
  spotifyURI: FormControl<FolderEntryFormRawValue['spotifyURI']>;
  addTime: FormControl<FolderEntryFormRawValue['addTime']>;
  folder: FormControl<FolderEntryFormRawValue['folder']>;
  tracks: FormControl<FolderEntryFormRawValue['tracks']>;
  albums: FormControl<FolderEntryFormRawValue['albums']>;
};

export type FolderEntryFormGroup = FormGroup<FolderEntryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FolderEntryFormService {
  createFolderEntryFormGroup(folderEntry: FolderEntryFormGroupInput = { id: null }): FolderEntryFormGroup {
    const folderEntryRawValue = this.convertFolderEntryToFolderEntryRawValue({
      ...this.getFormDefaults(),
      ...folderEntry,
    });
    return new FormGroup<FolderEntryFormGroupContent>({
      id: new FormControl(
        { value: folderEntryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      folderID: new FormControl(folderEntryRawValue.folderID, {
        validators: [Validators.required],
      }),
      spotifyURI: new FormControl(folderEntryRawValue.spotifyURI, {
        validators: [Validators.required],
      }),
      addTime: new FormControl(folderEntryRawValue.addTime, {
        validators: [Validators.required],
      }),
      folder: new FormControl(folderEntryRawValue.folder),
      tracks: new FormControl(folderEntryRawValue.tracks ?? []),
      albums: new FormControl(folderEntryRawValue.albums ?? []),
    });
  }

  getFolderEntry(form: FolderEntryFormGroup): IFolderEntry | NewFolderEntry {
    return this.convertFolderEntryRawValueToFolderEntry(form.getRawValue() as FolderEntryFormRawValue | NewFolderEntryFormRawValue);
  }

  resetForm(form: FolderEntryFormGroup, folderEntry: FolderEntryFormGroupInput): void {
    const folderEntryRawValue = this.convertFolderEntryToFolderEntryRawValue({ ...this.getFormDefaults(), ...folderEntry });
    form.reset(
      {
        ...folderEntryRawValue,
        id: { value: folderEntryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FolderEntryFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      addTime: currentTime,
      tracks: [],
      albums: [],
    };
  }

  private convertFolderEntryRawValueToFolderEntry(
    rawFolderEntry: FolderEntryFormRawValue | NewFolderEntryFormRawValue
  ): IFolderEntry | NewFolderEntry {
    return {
      ...rawFolderEntry,
      addTime: dayjs(rawFolderEntry.addTime, DATE_TIME_FORMAT),
    };
  }

  private convertFolderEntryToFolderEntryRawValue(
    folderEntry: IFolderEntry | (Partial<NewFolderEntry> & FolderEntryFormDefaults)
  ): FolderEntryFormRawValue | PartialWithRequiredKeyOf<NewFolderEntryFormRawValue> {
    return {
      ...folderEntry,
      addTime: folderEntry.addTime ? folderEntry.addTime.format(DATE_TIME_FORMAT) : undefined,
      tracks: folderEntry.tracks ?? [],
      albums: folderEntry.albums ?? [],
    };
  }
}
