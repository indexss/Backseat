import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITrack } from '../track.model';
import { TrackService } from '../service/track.service';

@Injectable({ providedIn: 'root' })
export class TrackRoutingResolveService implements Resolve<ITrack | null> {
  constructor(protected service: TrackService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrack | null | never> {
    const id = route.params['spotifyURI'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((track: HttpResponse<ITrack>) => {
          if (track.body) {
            return of(track.body);
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
