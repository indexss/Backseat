import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ArtistComponent } from '../list/artist.component';
import { ArtistDetailComponent } from '../detail/artist-detail.component';
import { ArtistUpdateComponent } from '../update/artist-update.component';
import { ArtistRoutingResolveService } from './artist-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const artistRoute: Routes = [
  {
    path: '',
    component: ArtistComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ArtistDetailComponent,
    resolve: {
      artist: ArtistRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ArtistUpdateComponent,
    resolve: {
      artist: ArtistRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ArtistUpdateComponent,
    resolve: {
      artist: ArtistRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(artistRoute)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
