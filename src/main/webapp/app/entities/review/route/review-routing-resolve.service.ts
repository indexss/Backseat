import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReview } from '../review.model';
import { ReviewService } from '../service/review.service';

@Injectable({ providedIn: 'root' })
export class ReviewRoutingResolveService implements Resolve<IReview | null> {
  constructor(protected service: ReviewService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReview | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((review: HttpResponse<IReview>) => {
          if (review.body) {
            return of(review.body);
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
