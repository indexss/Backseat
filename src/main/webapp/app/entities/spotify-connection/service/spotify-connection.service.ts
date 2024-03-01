import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISpotifyConnection, NewSpotifyConnection } from '../spotify-connection.model';

export type PartialUpdateSpotifyConnection = Partial<ISpotifyConnection> & Pick<ISpotifyConnection, 'spotifyURI'>;

type RestOf<T extends ISpotifyConnection | NewSpotifyConnection> = Omit<T, 'accessTokenExpiresAt'> & {
  accessTokenExpiresAt?: string | null;
};

export type RestSpotifyConnection = RestOf<ISpotifyConnection>;

export type NewRestSpotifyConnection = RestOf<NewSpotifyConnection>;

export type PartialUpdateRestSpotifyConnection = RestOf<PartialUpdateSpotifyConnection>;

export type EntityResponseType = HttpResponse<ISpotifyConnection>;
export type EntityArrayResponseType = HttpResponse<ISpotifyConnection[]>;

@Injectable({ providedIn: 'root' })
export class SpotifyConnectionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/spotify-connections');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(spotifyConnection: NewSpotifyConnection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spotifyConnection);
    return this.http
      .post<RestSpotifyConnection>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(spotifyConnection: ISpotifyConnection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spotifyConnection);
    return this.http
      .put<RestSpotifyConnection>(`${this.resourceUrl}/${this.getSpotifyConnectionIdentifier(spotifyConnection)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(spotifyConnection: PartialUpdateSpotifyConnection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(spotifyConnection);
    return this.http
      .patch<RestSpotifyConnection>(`${this.resourceUrl}/${this.getSpotifyConnectionIdentifier(spotifyConnection)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestSpotifyConnection>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSpotifyConnection[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSpotifyConnectionIdentifier(spotifyConnection: Pick<ISpotifyConnection, 'spotifyURI'>): string {
    return spotifyConnection.spotifyURI;
  }

  compareSpotifyConnection(o1: Pick<ISpotifyConnection, 'spotifyURI'> | null, o2: Pick<ISpotifyConnection, 'spotifyURI'> | null): boolean {
    return o1 && o2 ? this.getSpotifyConnectionIdentifier(o1) === this.getSpotifyConnectionIdentifier(o2) : o1 === o2;
  }

  addSpotifyConnectionToCollectionIfMissing<Type extends Pick<ISpotifyConnection, 'spotifyURI'>>(
    spotifyConnectionCollection: Type[],
    ...spotifyConnectionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const spotifyConnections: Type[] = spotifyConnectionsToCheck.filter(isPresent);
    if (spotifyConnections.length > 0) {
      const spotifyConnectionCollectionIdentifiers = spotifyConnectionCollection.map(
        spotifyConnectionItem => this.getSpotifyConnectionIdentifier(spotifyConnectionItem)!
      );
      const spotifyConnectionsToAdd = spotifyConnections.filter(spotifyConnectionItem => {
        const spotifyConnectionIdentifier = this.getSpotifyConnectionIdentifier(spotifyConnectionItem);
        if (spotifyConnectionCollectionIdentifiers.includes(spotifyConnectionIdentifier)) {
          return false;
        }
        spotifyConnectionCollectionIdentifiers.push(spotifyConnectionIdentifier);
        return true;
      });
      return [...spotifyConnectionsToAdd, ...spotifyConnectionCollection];
    }
    return spotifyConnectionCollection;
  }

  protected convertDateFromClient<T extends ISpotifyConnection | NewSpotifyConnection | PartialUpdateSpotifyConnection>(
    spotifyConnection: T
  ): RestOf<T> {
    return {
      ...spotifyConnection,
      accessTokenExpiresAt: spotifyConnection.accessTokenExpiresAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSpotifyConnection: RestSpotifyConnection): ISpotifyConnection {
    return {
      ...restSpotifyConnection,
      accessTokenExpiresAt: restSpotifyConnection.accessTokenExpiresAt ? dayjs(restSpotifyConnection.accessTokenExpiresAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSpotifyConnection>): HttpResponse<ISpotifyConnection> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSpotifyConnection[]>): HttpResponse<ISpotifyConnection[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
