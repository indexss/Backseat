import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WantToListenListEntryComponent } from '../list/want-to-listen-list-entry.component';
import { WantToListenListEntryDetailComponent } from '../detail/want-to-listen-list-entry-detail.component';
import { WantToListenListEntryUpdateComponent } from '../update/want-to-listen-list-entry-update.component';
import { WantToListenListEntryRoutingResolveService } from './want-to-listen-list-entry-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const wantToListenListEntryRoute: Routes = [
  {
    path: '',
    component: WantToListenListEntryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WantToListenListEntryDetailComponent,
    resolve: {
      wantToListenListEntry: WantToListenListEntryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WantToListenListEntryUpdateComponent,
    resolve: {
      wantToListenListEntry: WantToListenListEntryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WantToListenListEntryUpdateComponent,
    resolve: {
      wantToListenListEntry: WantToListenListEntryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(wantToListenListEntryRoute)],
  exports: [RouterModule],
})
export class WantToListenListEntryRoutingModule {}
