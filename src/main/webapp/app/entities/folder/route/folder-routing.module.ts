import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FolderComponent } from '../list/folder.component';
import { FolderDetailComponent } from '../detail/folder-detail.component';
import { FolderUpdateComponent } from '../update/folder-update.component';
import { FolderRoutingResolveService } from './folder-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const folderRoute: Routes = [
  {
    path: '',
    component: FolderComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FolderDetailComponent,
    resolve: {
      folder: FolderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FolderUpdateComponent,
    resolve: {
      folder: FolderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FolderUpdateComponent,
    resolve: {
      folder: FolderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(folderRoute)],
  exports: [RouterModule],
})
export class FolderRoutingModule {}
