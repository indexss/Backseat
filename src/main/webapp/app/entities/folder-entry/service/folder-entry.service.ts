import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFolderEntry, NewFolderEntry } from '../folder-entry.model';

export type PartialUpdateFolderEntry = Partial<IFolderEntry> & Pick<IFolderEntry, 'id'>;

type RestOf<T extends IFolderEntry | NewFolderEntry> = Omit<T, 'addTime'> & {
  addTime?: string | null;
};

export type RestFolderEntry = RestOf<IFolderEntry>;

export type NewRestFolderEntry = RestOf<NewFolderEntry>;

export type PartialUpdateRestFolderEntry = RestOf<PartialUpdateFolderEntry>;

export type EntityResponseType = HttpResponse<IFolderEntry>;
export type EntityArrayResponseType = HttpResponse<IFolderEntry[]>;

@Injectable({ providedIn: 'root' })
export class FolderEntryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/folder-entries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(folderEntry: NewFolderEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(folderEntry);
    return this.http
      .post<RestFolderEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(folderEntry: IFolderEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(folderEntry);
    return this.http
      .put<RestFolderEntry>(`${this.resourceUrl}/${this.getFolderEntryIdentifier(folderEntry)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(folderEntry: PartialUpdateFolderEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(folderEntry);
    return this.http
      .patch<RestFolderEntry>(`${this.resourceUrl}/${this.getFolderEntryIdentifier(folderEntry)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFolderEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFolderEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFolderEntryIdentifier(folderEntry: Pick<IFolderEntry, 'id'>): number {
    return folderEntry.id;
  }

  compareFolderEntry(o1: Pick<IFolderEntry, 'id'> | null, o2: Pick<IFolderEntry, 'id'> | null): boolean {
    return o1 && o2 ? this.getFolderEntryIdentifier(o1) === this.getFolderEntryIdentifier(o2) : o1 === o2;
  }

  addFolderEntryToCollectionIfMissing<Type extends Pick<IFolderEntry, 'id'>>(
    folderEntryCollection: Type[],
    ...folderEntriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const folderEntries: Type[] = folderEntriesToCheck.filter(isPresent);
    if (folderEntries.length > 0) {
      const folderEntryCollectionIdentifiers = folderEntryCollection.map(
        folderEntryItem => this.getFolderEntryIdentifier(folderEntryItem)!
      );
      const folderEntriesToAdd = folderEntries.filter(folderEntryItem => {
        const folderEntryIdentifier = this.getFolderEntryIdentifier(folderEntryItem);
        if (folderEntryCollectionIdentifiers.includes(folderEntryIdentifier)) {
          return false;
        }
        folderEntryCollectionIdentifiers.push(folderEntryIdentifier);
        return true;
      });
      return [...folderEntriesToAdd, ...folderEntryCollection];
    }
    return folderEntryCollection;
  }

  protected convertDateFromClient<T extends IFolderEntry | NewFolderEntry | PartialUpdateFolderEntry>(folderEntry: T): RestOf<T> {
    return {
      ...folderEntry,
      addTime: folderEntry.addTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFolderEntry: RestFolderEntry): IFolderEntry {
    return {
      ...restFolderEntry,
      addTime: restFolderEntry.addTime ? dayjs(restFolderEntry.addTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFolderEntry>): HttpResponse<IFolderEntry> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFolderEntry[]>): HttpResponse<IFolderEntry[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
