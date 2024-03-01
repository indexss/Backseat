import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TrackComponent } from '../list/track.component';
import { TrackDetailComponent } from '../detail/track-detail.component';
import { TrackUpdateComponent } from '../update/track-update.component';
import { TrackRoutingResolveService } from './track-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const trackRoute: Routes = [
  {
    path: '',
    component: TrackComponent,
    data: {
      defaultSort: 'spotifyURI,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':spotifyURI/view',
    component: TrackDetailComponent,
    resolve: {
      track: TrackRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrackUpdateComponent,
    resolve: {
      track: TrackRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':spotifyURI/edit',
    component: TrackUpdateComponent,
    resolve: {
      track: TrackRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trackRoute)],
  exports: [RouterModule],
})
export class TrackRoutingModule {}
