import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISetting } from '../setting.model';
import { SettingService } from '../service/setting.service';

@Injectable({ providedIn: 'root' })
export class SettingRoutingResolveService implements Resolve<ISetting | null> {
  constructor(protected service: SettingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISetting | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((setting: HttpResponse<ISetting>) => {
          if (setting.body) {
            return of(setting.body);
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
