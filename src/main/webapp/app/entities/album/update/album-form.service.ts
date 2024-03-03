import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlbum, NewAlbum } from '../album.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { spotifyURI: unknown }> = Partial<Omit<T, 'spotifyURI'>> & { spotifyURI: T['spotifyURI'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlbum for edit and NewAlbumFormGroupInput for create.
 */
type AlbumFormGroupInput = IAlbum | PartialWithRequiredKeyOf<NewAlbum>;

type AlbumFormDefaults = Pick<NewAlbum, 'spotifyURI' | 'artists' | 'folderEntries' | 'wantToListenListEntries'>;

type AlbumFormGroupContent = {
  spotifyURI: FormControl<IAlbum['spotifyURI'] | NewAlbum['spotifyURI']>;
  name: FormControl<IAlbum['name']>;
  totalTracks: FormControl<IAlbum['totalTracks']>;
  releaseDate: FormControl<IAlbum['releaseDate']>;
  rating: FormControl<IAlbum['rating']>;
  artists: FormControl<IAlbum['artists']>;
  folderEntries: FormControl<IAlbum['folderEntries']>;
  wantToListenListEntries: FormControl<IAlbum['wantToListenListEntries']>;
};

export type AlbumFormGroup = FormGroup<AlbumFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlbumFormService {
  createAlbumFormGroup(album: AlbumFormGroupInput = { spotifyURI: null }): AlbumFormGroup {
    const albumRawValue = {
      ...this.getFormDefaults(),
      ...album,
    };
    return new FormGroup<AlbumFormGroupContent>({
      spotifyURI: new FormControl(
        { value: albumRawValue.spotifyURI, disabled: albumRawValue.spotifyURI !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(albumRawValue.name, {
        validators: [Validators.required],
      }),
      totalTracks: new FormControl(albumRawValue.totalTracks, {
        validators: [Validators.required],
      }),
      releaseDate: new FormControl(albumRawValue.releaseDate, {
        validators: [Validators.required],
      }),
      rating: new FormControl(albumRawValue.rating, {
        validators: [Validators.required],
      }),
      artists: new FormControl(albumRawValue.artists ?? []),
      folderEntries: new FormControl(albumRawValue.folderEntries ?? []),
      wantToListenListEntries: new FormControl(albumRawValue.wantToListenListEntries ?? []),
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
        spotifyURI: { value: albumRawValue.spotifyURI, disabled: albumRawValue.spotifyURI !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlbumFormDefaults {
    return {
      spotifyURI: null,
      artists: [],
      folderEntries: [],
      wantToListenListEntries: [],
    };
  }
}
