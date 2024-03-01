import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISpotifyConnection, NewSpotifyConnection } from '../spotify-connection.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { spotifyURI: unknown }> = Partial<Omit<T, 'spotifyURI'>> & { spotifyURI: T['spotifyURI'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISpotifyConnection for edit and NewSpotifyConnectionFormGroupInput for create.
 */
type SpotifyConnectionFormGroupInput = ISpotifyConnection | PartialWithRequiredKeyOf<NewSpotifyConnection>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISpotifyConnection | NewSpotifyConnection> = Omit<T, 'accessTokenExpiresAt'> & {
  accessTokenExpiresAt?: string | null;
};

type SpotifyConnectionFormRawValue = FormValueOf<ISpotifyConnection>;

type NewSpotifyConnectionFormRawValue = FormValueOf<NewSpotifyConnection>;

type SpotifyConnectionFormDefaults = Pick<NewSpotifyConnection, 'spotifyURI' | 'accessTokenExpiresAt'>;

type SpotifyConnectionFormGroupContent = {
  spotifyURI: FormControl<SpotifyConnectionFormRawValue['spotifyURI'] | NewSpotifyConnection['spotifyURI']>;
  refreshToken: FormControl<SpotifyConnectionFormRawValue['refreshToken']>;
  accessToken: FormControl<SpotifyConnectionFormRawValue['accessToken']>;
  accessTokenExpiresAt: FormControl<SpotifyConnectionFormRawValue['accessTokenExpiresAt']>;
};

export type SpotifyConnectionFormGroup = FormGroup<SpotifyConnectionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SpotifyConnectionFormService {
  createSpotifyConnectionFormGroup(spotifyConnection: SpotifyConnectionFormGroupInput = { spotifyURI: null }): SpotifyConnectionFormGroup {
    const spotifyConnectionRawValue = this.convertSpotifyConnectionToSpotifyConnectionRawValue({
      ...this.getFormDefaults(),
      ...spotifyConnection,
    });
    return new FormGroup<SpotifyConnectionFormGroupContent>({
      spotifyURI: new FormControl(
        { value: spotifyConnectionRawValue.spotifyURI, disabled: spotifyConnectionRawValue.spotifyURI !== null },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      refreshToken: new FormControl(spotifyConnectionRawValue.refreshToken, {
        validators: [Validators.required],
      }),
      accessToken: new FormControl(spotifyConnectionRawValue.accessToken, {
        validators: [Validators.required],
      }),
      accessTokenExpiresAt: new FormControl(spotifyConnectionRawValue.accessTokenExpiresAt, {
        validators: [Validators.required],
      }),
    });
  }

  getSpotifyConnection(form: SpotifyConnectionFormGroup): ISpotifyConnection | NewSpotifyConnection {
    return this.convertSpotifyConnectionRawValueToSpotifyConnection(
      form.getRawValue() as SpotifyConnectionFormRawValue | NewSpotifyConnectionFormRawValue
    );
  }

  resetForm(form: SpotifyConnectionFormGroup, spotifyConnection: SpotifyConnectionFormGroupInput): void {
    const spotifyConnectionRawValue = this.convertSpotifyConnectionToSpotifyConnectionRawValue({
      ...this.getFormDefaults(),
      ...spotifyConnection,
    });
    form.reset(
      {
        ...spotifyConnectionRawValue,
        spotifyURI: { value: spotifyConnectionRawValue.spotifyURI, disabled: spotifyConnectionRawValue.spotifyURI !== null },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SpotifyConnectionFormDefaults {
    const currentTime = dayjs();

    return {
      spotifyURI: null,
      accessTokenExpiresAt: currentTime,
    };
  }

  private convertSpotifyConnectionRawValueToSpotifyConnection(
    rawSpotifyConnection: SpotifyConnectionFormRawValue | NewSpotifyConnectionFormRawValue
  ): ISpotifyConnection | NewSpotifyConnection {
    return {
      ...rawSpotifyConnection,
      accessTokenExpiresAt: dayjs(rawSpotifyConnection.accessTokenExpiresAt, DATE_TIME_FORMAT),
    };
  }

  private convertSpotifyConnectionToSpotifyConnectionRawValue(
    spotifyConnection: ISpotifyConnection | (Partial<NewSpotifyConnection> & SpotifyConnectionFormDefaults)
  ): SpotifyConnectionFormRawValue | PartialWithRequiredKeyOf<NewSpotifyConnectionFormRawValue> {
    return {
      ...spotifyConnection,
      accessTokenExpiresAt: spotifyConnection.accessTokenExpiresAt
        ? spotifyConnection.accessTokenExpiresAt.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
