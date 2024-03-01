import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWantToListenListEntry, NewWantToListenListEntry } from '../want-to-listen-list-entry.model';

export type PartialUpdateWantToListenListEntry = Partial<IWantToListenListEntry> & Pick<IWantToListenListEntry, 'id'>;

type RestOf<T extends IWantToListenListEntry | NewWantToListenListEntry> = Omit<T, 'addTime'> & {
  addTime?: string | null;
};

export type RestWantToListenListEntry = RestOf<IWantToListenListEntry>;

export type NewRestWantToListenListEntry = RestOf<NewWantToListenListEntry>;

export type PartialUpdateRestWantToListenListEntry = RestOf<PartialUpdateWantToListenListEntry>;

export type EntityResponseType = HttpResponse<IWantToListenListEntry>;
export type EntityArrayResponseType = HttpResponse<IWantToListenListEntry[]>;

@Injectable({ providedIn: 'root' })
export class WantToListenListEntryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/want-to-listen-list-entries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(wantToListenListEntry: NewWantToListenListEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wantToListenListEntry);
    return this.http
      .post<RestWantToListenListEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(wantToListenListEntry: IWantToListenListEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wantToListenListEntry);
    return this.http
      .put<RestWantToListenListEntry>(`${this.resourceUrl}/${this.getWantToListenListEntryIdentifier(wantToListenListEntry)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(wantToListenListEntry: PartialUpdateWantToListenListEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wantToListenListEntry);
    return this.http
      .patch<RestWantToListenListEntry>(`${this.resourceUrl}/${this.getWantToListenListEntryIdentifier(wantToListenListEntry)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWantToListenListEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWantToListenListEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWantToListenListEntryIdentifier(wantToListenListEntry: Pick<IWantToListenListEntry, 'id'>): number {
    return wantToListenListEntry.id;
  }

  compareWantToListenListEntry(o1: Pick<IWantToListenListEntry, 'id'> | null, o2: Pick<IWantToListenListEntry, 'id'> | null): boolean {
    return o1 && o2 ? this.getWantToListenListEntryIdentifier(o1) === this.getWantToListenListEntryIdentifier(o2) : o1 === o2;
  }

  addWantToListenListEntryToCollectionIfMissing<Type extends Pick<IWantToListenListEntry, 'id'>>(
    wantToListenListEntryCollection: Type[],
    ...wantToListenListEntriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const wantToListenListEntries: Type[] = wantToListenListEntriesToCheck.filter(isPresent);
    if (wantToListenListEntries.length > 0) {
      const wantToListenListEntryCollectionIdentifiers = wantToListenListEntryCollection.map(
        wantToListenListEntryItem => this.getWantToListenListEntryIdentifier(wantToListenListEntryItem)!
      );
      const wantToListenListEntriesToAdd = wantToListenListEntries.filter(wantToListenListEntryItem => {
        const wantToListenListEntryIdentifier = this.getWantToListenListEntryIdentifier(wantToListenListEntryItem);
        if (wantToListenListEntryCollectionIdentifiers.includes(wantToListenListEntryIdentifier)) {
          return false;
        }
        wantToListenListEntryCollectionIdentifiers.push(wantToListenListEntryIdentifier);
        return true;
      });
      return [...wantToListenListEntriesToAdd, ...wantToListenListEntryCollection];
    }
    return wantToListenListEntryCollection;
  }

  protected convertDateFromClient<T extends IWantToListenListEntry | NewWantToListenListEntry | PartialUpdateWantToListenListEntry>(
    wantToListenListEntry: T
  ): RestOf<T> {
    return {
      ...wantToListenListEntry,
      addTime: wantToListenListEntry.addTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restWantToListenListEntry: RestWantToListenListEntry): IWantToListenListEntry {
    return {
      ...restWantToListenListEntry,
      addTime: restWantToListenListEntry.addTime ? dayjs(restWantToListenListEntry.addTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWantToListenListEntry>): HttpResponse<IWantToListenListEntry> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWantToListenListEntry[]>): HttpResponse<IWantToListenListEntry[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
