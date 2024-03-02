import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SpotifyConnectionComponent } from '../list/spotify-connection.component';
import { SpotifyConnectionDetailComponent } from '../detail/spotify-connection-detail.component';
import { SpotifyConnectionUpdateComponent } from '../update/spotify-connection-update.component';
import { SpotifyConnectionRoutingResolveService } from './spotify-connection-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const spotifyConnectionRoute: Routes = [
  {
    path: '',
    component: SpotifyConnectionComponent,
    data: {
      defaultSort: 'spotifyURI,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':spotifyURI/view',
    component: SpotifyConnectionDetailComponent,
    resolve: {
      spotifyConnection: SpotifyConnectionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SpotifyConnectionUpdateComponent,
    resolve: {
      spotifyConnection: SpotifyConnectionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':spotifyURI/edit',
    component: SpotifyConnectionUpdateComponent,
    resolve: {
      spotifyConnection: SpotifyConnectionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(spotifyConnectionRoute)],
  exports: [RouterModule],
})
export class SpotifyConnectionRoutingModule {}
