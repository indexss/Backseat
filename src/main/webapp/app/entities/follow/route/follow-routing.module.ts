import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FollowComponent } from '../list/follow.component';
import { FollowDetailComponent } from '../detail/follow-detail.component';
import { FollowUpdateComponent } from '../update/follow-update.component';
import { FollowRoutingResolveService } from './follow-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const followRoute: Routes = [
  {
    path: '',
    component: FollowComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FollowDetailComponent,
    resolve: {
      follow: FollowRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FollowUpdateComponent,
    resolve: {
      follow: FollowRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FollowUpdateComponent,
    resolve: {
      follow: FollowRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(followRoute)],
  exports: [RouterModule],
})
export class FollowRoutingModule {}
