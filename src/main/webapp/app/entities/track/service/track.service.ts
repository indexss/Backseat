import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrack, NewTrack } from '../track.model';

export type PartialUpdateTrack = Partial<ITrack> & Pick<ITrack, 'spotifyURI'>;

type RestOf<T extends ITrack | NewTrack> = Omit<T, 'releaseDate'> & {
  releaseDate?: string | null;
};

export type RestTrack = RestOf<ITrack>;

export type NewRestTrack = RestOf<NewTrack>;

export type PartialUpdateRestTrack = RestOf<PartialUpdateTrack>;

export type EntityResponseType = HttpResponse<ITrack>;
export type EntityArrayResponseType = HttpResponse<ITrack[]>;

@Injectable({ providedIn: 'root' })
export class TrackService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tracks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(track: NewTrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http.post<RestTrack>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(track: ITrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http
      .put<RestTrack>(`${this.resourceUrl}/${this.getTrackIdentifier(track)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(track: PartialUpdateTrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http
      .patch<RestTrack>(`${this.resourceUrl}/${this.getTrackIdentifier(track)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestTrack>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTrack[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTrackIdentifier(track: Pick<ITrack, 'spotifyURI'>): string {
    return track.spotifyURI;
  }

  compareTrack(o1: Pick<ITrack, 'spotifyURI'> | null, o2: Pick<ITrack, 'spotifyURI'> | null): boolean {
    return o1 && o2 ? this.getTrackIdentifier(o1) === this.getTrackIdentifier(o2) : o1 === o2;
  }

  addTrackToCollectionIfMissing<Type extends Pick<ITrack, 'spotifyURI'>>(
    trackCollection: Type[],
    ...tracksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tracks: Type[] = tracksToCheck.filter(isPresent);
    if (tracks.length > 0) {
      const trackCollectionIdentifiers = trackCollection.map(trackItem => this.getTrackIdentifier(trackItem)!);
      const tracksToAdd = tracks.filter(trackItem => {
        const trackIdentifier = this.getTrackIdentifier(trackItem);
        if (trackCollectionIdentifiers.includes(trackIdentifier)) {
          return false;
        }
        trackCollectionIdentifiers.push(trackIdentifier);
        return true;
      });
      return [...tracksToAdd, ...trackCollection];
    }
    return trackCollection;
  }

  protected convertDateFromClient<T extends ITrack | NewTrack | PartialUpdateTrack>(track: T): RestOf<T> {
    return {
      ...track,
      releaseDate: track.releaseDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTrack: RestTrack): ITrack {
    return {
      ...restTrack,
      releaseDate: restTrack.releaseDate ? dayjs(restTrack.releaseDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTrack>): HttpResponse<ITrack> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTrack[]>): HttpResponse<ITrack[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
