import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReviewComponent } from '../list/review.component';
import { ReviewDetailComponent } from '../detail/review-detail.component';
import { ReviewUpdateComponent } from '../update/review-update.component';
import { ReviewRoutingResolveService } from './review-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const reviewRoute: Routes = [
  {
    path: '',
    component: ReviewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReviewDetailComponent,
    resolve: {
      review: ReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReviewUpdateComponent,
    resolve: {
      review: ReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReviewUpdateComponent,
    resolve: {
      review: ReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reviewRoute)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
