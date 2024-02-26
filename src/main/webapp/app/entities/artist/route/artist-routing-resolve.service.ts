import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IArtist } from '../artist.model';
import { ArtistService } from '../service/artist.service';

@Injectable({ providedIn: 'root' })
export class ArtistRoutingResolveService implements Resolve<IArtist | null> {
  constructor(protected service: ArtistService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArtist | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((artist: HttpResponse<IArtist>) => {
          if (artist.body) {
            return of(artist.body);
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
