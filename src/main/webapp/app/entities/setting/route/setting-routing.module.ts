import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SettingComponent } from '../list/setting.component';
import { SettingDetailComponent } from '../detail/setting-detail.component';
import { SettingUpdateComponent } from '../update/setting-update.component';
import { SettingRoutingResolveService } from './setting-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const settingRoute: Routes = [
  {
    path: '',
    component: SettingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SettingDetailComponent,
    resolve: {
      setting: SettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SettingUpdateComponent,
    resolve: {
      setting: SettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SettingUpdateComponent,
    resolve: {
      setting: SettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingRoute)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
