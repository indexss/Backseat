import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITrack, NewTrack } from '../track.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { spotifyURI: unknown }> = Partial<Omit<T, 'spotifyURI'>> & { spotifyURI: T['spotifyURI'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrack for edit and NewTrackFormGroupInput for create.
 */
type TrackFormGroupInput = ITrack | PartialWithRequiredKeyOf<NewTrack>;

type TrackFormDefaults = Pick<NewTrack, 'spotifyURI' | 'artists' | 'folderEntries' | 'wantToListenListEntries'>;

type TrackFormGroupContent = {
  spotifyURI: FormControl<ITrack['spotifyURI'] | NewTrack['spotifyURI']>;
  name: FormControl<ITrack['name']>;
  description: FormControl<ITrack['description']>;
  releaseDate: FormControl<ITrack['releaseDate']>;
  rating: FormControl<ITrack['rating']>;
  artists: FormControl<ITrack['artists']>;
  folderEntries: FormControl<ITrack['folderEntries']>;
  wantToListenListEntries: FormControl<ITrack['wantToListenListEntries']>;
  album: FormControl<ITrack['album']>;
};

export type TrackFormGroup = FormGroup<TrackFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrackFormService {
  createTrackFormGroup(track: TrackFormGroupInput = { spotifyURI: null }): TrackFormGroup {
    const trackRawValue = {
      ...this.getFormDefaults(),
      ...track,
    };
    return new FormGroup<TrackFormGroupContent>({
      spotifyURI: new FormControl(
        { value: trackRawValue.spotifyURI, disabled: trackRawValue.spotifyURI !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(trackRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(trackRawValue.description),
      releaseDate: new FormControl(trackRawValue.releaseDate, {
        validators: [Validators.required],
      }),
      rating: new FormControl(trackRawValue.rating, {
        validators: [Validators.required],
      }),
      artists: new FormControl(trackRawValue.artists ?? []),
      folderEntries: new FormControl(trackRawValue.folderEntries ?? []),
      wantToListenListEntries: new FormControl(trackRawValue.wantToListenListEntries ?? []),
      album: new FormControl(trackRawValue.album),
    });
  }

  getTrack(form: TrackFormGroup): ITrack | NewTrack {
    return form.getRawValue() as ITrack | NewTrack;
  }

  resetForm(form: TrackFormGroup, track: TrackFormGroupInput): void {
    const trackRawValue = { ...this.getFormDefaults(), ...track };
    form.reset(
      {
        ...trackRawValue,
        spotifyURI: { value: trackRawValue.spotifyURI, disabled: trackRawValue.spotifyURI !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TrackFormDefaults {
    return {
      spotifyURI: null,
      artists: [],
      folderEntries: [],
      wantToListenListEntries: [],
    };
  }
}
