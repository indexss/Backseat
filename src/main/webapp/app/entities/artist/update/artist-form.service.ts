import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IArtist, NewArtist } from '../artist.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArtist for edit and NewArtistFormGroupInput for create.
 */
type ArtistFormGroupInput = IArtist | PartialWithRequiredKeyOf<NewArtist>;

type ArtistFormDefaults = Pick<NewArtist, 'id' | 'tracks' | 'albums'>;

type ArtistFormGroupContent = {
  id: FormControl<IArtist['id'] | NewArtist['id']>;
  spotifyURI: FormControl<IArtist['spotifyURI']>;
  name: FormControl<IArtist['name']>;
  tracks: FormControl<IArtist['tracks']>;
  albums: FormControl<IArtist['albums']>;
};

export type ArtistFormGroup = FormGroup<ArtistFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ArtistFormService {
  createArtistFormGroup(artist: ArtistFormGroupInput = { id: null }): ArtistFormGroup {
    const artistRawValue = {
      ...this.getFormDefaults(),
      ...artist,
    };
    return new FormGroup<ArtistFormGroupContent>({
      id: new FormControl(
        { value: artistRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      spotifyURI: new FormControl(artistRawValue.spotifyURI, {
        validators: [Validators.required],
      }),
      name: new FormControl(artistRawValue.name, {
        validators: [Validators.required],
      }),
      tracks: new FormControl(artistRawValue.tracks ?? []),
      albums: new FormControl(artistRawValue.albums ?? []),
    });
  }

  getArtist(form: ArtistFormGroup): IArtist | NewArtist {
    return form.getRawValue() as IArtist | NewArtist;
  }

  resetForm(form: ArtistFormGroup, artist: ArtistFormGroupInput): void {
    const artistRawValue = { ...this.getFormDefaults(), ...artist };
    form.reset(
      {
        ...artistRawValue,
        id: { value: artistRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ArtistFormDefaults {
    return {
      id: null,
      tracks: [],
      albums: [],
    };
  }
}
