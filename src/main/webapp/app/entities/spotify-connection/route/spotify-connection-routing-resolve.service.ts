import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISpotifyConnection } from '../spotify-connection.model';
import { SpotifyConnectionService } from '../service/spotify-connection.service';

@Injectable({ providedIn: 'root' })
export class SpotifyConnectionRoutingResolveService implements Resolve<ISpotifyConnection | null> {
  constructor(protected service: SpotifyConnectionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpotifyConnection | null | never> {
    const id = route.params['spotifyURI'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((spotifyConnection: HttpResponse<ISpotifyConnection>) => {
          if (spotifyConnection.body) {
            return of(spotifyConnection.body);
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
