import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISpotifyConnection, NewSpotifyConnection } from '../spotify-connection.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

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

type SpotifyConnectionFormDefaults = Pick<NewSpotifyConnection, 'id' | 'accessTokenExpiresAt'>;

type SpotifyConnectionFormGroupContent = {
  id: FormControl<SpotifyConnectionFormRawValue['id'] | NewSpotifyConnection['id']>;
  spotifyURI: FormControl<SpotifyConnectionFormRawValue['spotifyURI']>;
  refreshToken: FormControl<SpotifyConnectionFormRawValue['refreshToken']>;
  accessToken: FormControl<SpotifyConnectionFormRawValue['accessToken']>;
  accessTokenExpiresAt: FormControl<SpotifyConnectionFormRawValue['accessTokenExpiresAt']>;
};

export type SpotifyConnectionFormGroup = FormGroup<SpotifyConnectionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SpotifyConnectionFormService {
  createSpotifyConnectionFormGroup(spotifyConnection: SpotifyConnectionFormGroupInput = { id: null }): SpotifyConnectionFormGroup {
    const spotifyConnectionRawValue = this.convertSpotifyConnectionToSpotifyConnectionRawValue({
      ...this.getFormDefaults(),
      ...spotifyConnection,
    });
    return new FormGroup<SpotifyConnectionFormGroupContent>({
      id: new FormControl(
        { value: spotifyConnectionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      spotifyURI: new FormControl(spotifyConnectionRawValue.spotifyURI, {
        validators: [Validators.required],
      }),
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
        id: { value: spotifyConnectionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SpotifyConnectionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
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
