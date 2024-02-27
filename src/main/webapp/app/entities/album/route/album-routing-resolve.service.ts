import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlbum } from '../album.model';
import { AlbumService } from '../service/album.service';

@Injectable({ providedIn: 'root' })
export class AlbumRoutingResolveService implements Resolve<IAlbum | null> {
  constructor(protected service: AlbumService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlbum | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((album: HttpResponse<IAlbum>) => {
          if (album.body) {
            return of(album.body);
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
