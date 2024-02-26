import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FolderEntryComponent } from '../list/folder-entry.component';
import { FolderEntryDetailComponent } from '../detail/folder-entry-detail.component';
import { FolderEntryUpdateComponent } from '../update/folder-entry-update.component';
import { FolderEntryRoutingResolveService } from './folder-entry-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const folderEntryRoute: Routes = [
  {
    path: '',
    component: FolderEntryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FolderEntryDetailComponent,
    resolve: {
      folderEntry: FolderEntryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FolderEntryUpdateComponent,
    resolve: {
      folderEntry: FolderEntryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FolderEntryUpdateComponent,
    resolve: {
      folderEntry: FolderEntryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(folderEntryRoute)],
  exports: [RouterModule],
})
export class FolderEntryRoutingModule {}
