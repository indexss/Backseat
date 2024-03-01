import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IArtist, NewArtist } from '../artist.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { spotifyURI: unknown }> = Partial<Omit<T, 'spotifyURI'>> & { spotifyURI: T['spotifyURI'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArtist for edit and NewArtistFormGroupInput for create.
 */
type ArtistFormGroupInput = IArtist | PartialWithRequiredKeyOf<NewArtist>;

type ArtistFormDefaults = Pick<NewArtist, 'spotifyURI' | 'tracks' | 'albums'>;

type ArtistFormGroupContent = {
  spotifyURI: FormControl<IArtist['spotifyURI'] | NewArtist['spotifyURI']>;
  name: FormControl<IArtist['name']>;
  tracks: FormControl<IArtist['tracks']>;
  albums: FormControl<IArtist['albums']>;
};

export type ArtistFormGroup = FormGroup<ArtistFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ArtistFormService {
  createArtistFormGroup(artist: ArtistFormGroupInput = { spotifyURI: null }): ArtistFormGroup {
    const artistRawValue = {
      ...this.getFormDefaults(),
      ...artist,
    };
    return new FormGroup<ArtistFormGroupContent>({
      spotifyURI: new FormControl(
        { value: artistRawValue.spotifyURI, disabled: artistRawValue.spotifyURI !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
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
        spotifyURI: { value: artistRawValue.spotifyURI, disabled: artistRawValue.spotifyURI !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ArtistFormDefaults {
    return {
      spotifyURI: null,
      tracks: [],
      albums: [],
    };
  }
}
