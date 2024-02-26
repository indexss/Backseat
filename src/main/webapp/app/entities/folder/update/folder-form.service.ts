import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFolder, NewFolder } from '../folder.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFolder for edit and NewFolderFormGroupInput for create.
 */
type FolderFormGroupInput = IFolder | PartialWithRequiredKeyOf<NewFolder>;

type FolderFormDefaults = Pick<NewFolder, 'id'>;

type FolderFormGroupContent = {
  id: FormControl<IFolder['id'] | NewFolder['id']>;
  name: FormControl<IFolder['name']>;
  imagePath: FormControl<IFolder['imagePath']>;
  imagePathContentType: FormControl<IFolder['imagePathContentType']>;
  profile: FormControl<IFolder['profile']>;
};

export type FolderFormGroup = FormGroup<FolderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FolderFormService {
  createFolderFormGroup(folder: FolderFormGroupInput = { id: null }): FolderFormGroup {
    const folderRawValue = {
      ...this.getFormDefaults(),
      ...folder,
    };
    return new FormGroup<FolderFormGroupContent>({
      id: new FormControl(
        { value: folderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(folderRawValue.name, {
        validators: [Validators.required],
      }),
      imagePath: new FormControl(folderRawValue.imagePath),
      imagePathContentType: new FormControl(folderRawValue.imagePathContentType),
      profile: new FormControl(folderRawValue.profile),
    });
  }

  getFolder(form: FolderFormGroup): IFolder | NewFolder {
    return form.getRawValue() as IFolder | NewFolder;
  }

  resetForm(form: FolderFormGroup, folder: FolderFormGroupInput): void {
    const folderRawValue = { ...this.getFormDefaults(), ...folder };
    form.reset(
      {
        ...folderRawValue,
        id: { value: folderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FolderFormDefaults {
    return {
      id: null,
    };
  }
}
