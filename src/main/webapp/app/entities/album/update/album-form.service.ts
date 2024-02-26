import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlbum, NewAlbum } from '../album.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlbum for edit and NewAlbumFormGroupInput for create.
 */
type AlbumFormGroupInput = IAlbum | PartialWithRequiredKeyOf<NewAlbum>;

type AlbumFormDefaults = Pick<NewAlbum, 'id' | 'artists'>;

type AlbumFormGroupContent = {
  id: FormControl<IAlbum['id'] | NewAlbum['id']>;
  spotifyURI: FormControl<IAlbum['spotifyURI']>;
  name: FormControl<IAlbum['name']>;
  totalTracks: FormControl<IAlbum['totalTracks']>;
  description: FormControl<IAlbum['description']>;
  releaseDate: FormControl<IAlbum['releaseDate']>;
  rating: FormControl<IAlbum['rating']>;
  artists: FormControl<IAlbum['artists']>;
};

export type AlbumFormGroup = FormGroup<AlbumFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlbumFormService {
  createAlbumFormGroup(album: AlbumFormGroupInput = { id: null }): AlbumFormGroup {
    const albumRawValue = {
      ...this.getFormDefaults(),
      ...album,
    };
    return new FormGroup<AlbumFormGroupContent>({
      id: new FormControl(
        { value: albumRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      spotifyURI: new FormControl(albumRawValue.spotifyURI, {
        validators: [Validators.required],
      }),
      name: new FormControl(albumRawValue.name, {
        validators: [Validators.required],
      }),
      totalTracks: new FormControl(albumRawValue.totalTracks, {
        validators: [Validators.required],
      }),
      description: new FormControl(albumRawValue.description),
      releaseDate: new FormControl(albumRawValue.releaseDate, {
        validators: [Validators.required],
      }),
      rating: new FormControl(albumRawValue.rating, {
        validators: [Validators.required],
      }),
      artists: new FormControl(albumRawValue.artists ?? []),
    });
  }

  getAlbum(form: AlbumFormGroup): IAlbum | NewAlbum {
    return form.getRawValue() as IAlbum | NewAlbum;
  }

  resetForm(form: AlbumFormGroup, album: AlbumFormGroupInput): void {
    const albumRawValue = { ...this.getFormDefaults(), ...album };
    form.reset(
      {
        ...albumRawValue,
        id: { value: albumRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlbumFormDefaults {
    return {
      id: null,
      artists: [],
    };
  }
}
