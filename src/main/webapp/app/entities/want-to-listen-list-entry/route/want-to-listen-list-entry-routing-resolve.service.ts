import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';
import { WantToListenListEntryService } from '../service/want-to-listen-list-entry.service';

@Injectable({ providedIn: 'root' })
export class WantToListenListEntryRoutingResolveService implements Resolve<IWantToListenListEntry | null> {
  constructor(protected service: WantToListenListEntryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWantToListenListEntry | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((wantToListenListEntry: HttpResponse<IWantToListenListEntry>) => {
          if (wantToListenListEntry.body) {
            return of(wantToListenListEntry.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
