import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFolder } from '../folder.model';
import { FolderService } from '../service/folder.service';

@Injectable({ providedIn: 'root' })
export class FolderRoutingResolveService implements Resolve<IFolder | null> {
  constructor(protected service: FolderService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFolder | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((folder: HttpResponse<IFolder>) => {
          if (folder.body) {
            return of(folder.body);
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
