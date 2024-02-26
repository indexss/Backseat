import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFolderEntry } from '../folder-entry.model';
import { FolderEntryService } from '../service/folder-entry.service';

@Injectable({ providedIn: 'root' })
export class FolderEntryRoutingResolveService implements Resolve<IFolderEntry | null> {
  constructor(protected service: FolderEntryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFolderEntry | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((folderEntry: HttpResponse<IFolderEntry>) => {
          if (folderEntry.body) {
            return of(folderEntry.body);
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
