import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFolder, NewFolder } from '../folder.model';

export type PartialUpdateFolder = Partial<IFolder> & Pick<IFolder, 'id'>;

export type EntityResponseType = HttpResponse<IFolder>;
export type EntityArrayResponseType = HttpResponse<IFolder[]>;

@Injectable({ providedIn: 'root' })
export class FolderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/folders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(folder: NewFolder): Observable<EntityResponseType> {
    return this.http.post<IFolder>(this.resourceUrl, folder, { observe: 'response' });
  }

  update(folder: IFolder): Observable<EntityResponseType> {
    return this.http.put<IFolder>(`${this.resourceUrl}/${this.getFolderIdentifier(folder)}`, folder, { observe: 'response' });
  }

  partialUpdate(folder: PartialUpdateFolder): Observable<EntityResponseType> {
    return this.http.patch<IFolder>(`${this.resourceUrl}/${this.getFolderIdentifier(folder)}`, folder, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFolder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFolder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFolderIdentifier(folder: Pick<IFolder, 'id'>): number {
    return folder.id;
  }

  compareFolder(o1: Pick<IFolder, 'id'> | null, o2: Pick<IFolder, 'id'> | null): boolean {
    return o1 && o2 ? this.getFolderIdentifier(o1) === this.getFolderIdentifier(o2) : o1 === o2;
  }

  addFolderToCollectionIfMissing<Type extends Pick<IFolder, 'id'>>(
    folderCollection: Type[],
    ...foldersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const folders: Type[] = foldersToCheck.filter(isPresent);
    if (folders.length > 0) {
      const folderCollectionIdentifiers = folderCollection.map(folderItem => this.getFolderIdentifier(folderItem)!);
      const foldersToAdd = folders.filter(folderItem => {
        const folderIdentifier = this.getFolderIdentifier(folderItem);
        if (folderCollectionIdentifiers.includes(folderIdentifier)) {
          return false;
        }
        folderCollectionIdentifiers.push(folderIdentifier);
        return true;
      });
      return [...foldersToAdd, ...folderCollection];
    }
    return folderCollection;
  }
}
