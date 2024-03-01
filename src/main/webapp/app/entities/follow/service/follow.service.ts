import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFollow, NewFollow } from '../follow.model';

export type PartialUpdateFollow = Partial<IFollow> & Pick<IFollow, 'id'>;

export type EntityResponseType = HttpResponse<IFollow>;
export type EntityArrayResponseType = HttpResponse<IFollow[]>;

@Injectable({ providedIn: 'root' })
export class FollowService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/follows');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(follow: NewFollow): Observable<EntityResponseType> {
    return this.http.post<IFollow>(this.resourceUrl, follow, { observe: 'response' });
  }

  update(follow: IFollow): Observable<EntityResponseType> {
    return this.http.put<IFollow>(`${this.resourceUrl}/${this.getFollowIdentifier(follow)}`, follow, { observe: 'response' });
  }

  partialUpdate(follow: PartialUpdateFollow): Observable<EntityResponseType> {
    return this.http.patch<IFollow>(`${this.resourceUrl}/${this.getFollowIdentifier(follow)}`, follow, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFollow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFollow[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFollowIdentifier(follow: Pick<IFollow, 'id'>): number {
    return follow.id;
  }

  compareFollow(o1: Pick<IFollow, 'id'> | null, o2: Pick<IFollow, 'id'> | null): boolean {
    return o1 && o2 ? this.getFollowIdentifier(o1) === this.getFollowIdentifier(o2) : o1 === o2;
  }

  addFollowToCollectionIfMissing<Type extends Pick<IFollow, 'id'>>(
    followCollection: Type[],
    ...followsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const follows: Type[] = followsToCheck.filter(isPresent);
    if (follows.length > 0) {
      const followCollectionIdentifiers = followCollection.map(followItem => this.getFollowIdentifier(followItem)!);
      const followsToAdd = follows.filter(followItem => {
        const followIdentifier = this.getFollowIdentifier(followItem);
        if (followCollectionIdentifiers.includes(followIdentifier)) {
          return false;
        }
        followCollectionIdentifiers.push(followIdentifier);
        return true;
      });
      return [...followsToAdd, ...followCollection];
    }
    return followCollection;
  }
}
