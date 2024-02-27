import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITrack, NewTrack } from '../track.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrack for edit and NewTrackFormGroupInput for create.
 */
type TrackFormGroupInput = ITrack | PartialWithRequiredKeyOf<NewTrack>;

type TrackFormDefaults = Pick<NewTrack, 'id' | 'artists' | 'folderEntries' | 'wantToListenListEntries'>;

type TrackFormGroupContent = {
  id: FormControl<ITrack['id'] | NewTrack['id']>;
  spotifyURI: FormControl<ITrack['spotifyURI']>;
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
  createTrackFormGroup(track: TrackFormGroupInput = { id: null }): TrackFormGroup {
    const trackRawValue = {
      ...this.getFormDefaults(),
      ...track,
    };
    return new FormGroup<TrackFormGroupContent>({
      id: new FormControl(
        { value: trackRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      spotifyURI: new FormControl(trackRawValue.spotifyURI, {
        validators: [Validators.required],
      }),
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
        id: { value: trackRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TrackFormDefaults {
    return {
      id: null,
      artists: [],
      folderEntries: [],
      wantToListenListEntries: [],
    };
  }
}
