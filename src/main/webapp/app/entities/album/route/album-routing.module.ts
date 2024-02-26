import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlbumComponent } from '../list/album.component';
import { AlbumDetailComponent } from '../detail/album-detail.component';
import { AlbumUpdateComponent } from '../update/album-update.component';
import { AlbumRoutingResolveService } from './album-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const albumRoute: Routes = [
  {
    path: '',
    component: AlbumComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlbumDetailComponent,
    resolve: {
      album: AlbumRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlbumUpdateComponent,
    resolve: {
      album: AlbumRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlbumUpdateComponent,
    resolve: {
      album: AlbumRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(albumRoute)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
