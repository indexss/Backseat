import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SettingComponent } from './list/setting.component';
import { SettingDetailComponent } from './detail/setting-detail.component';
import { SettingUpdateComponent } from './update/setting-update.component';
import { SettingDeleteDialogComponent } from './delete/setting-delete-dialog.component';
import { SettingRoutingModule } from './route/setting-routing.module';

@NgModule({
  imports: [SharedModule, SettingRoutingModule],
  declarations: [SettingComponent, SettingDetailComponent, SettingUpdateComponent, SettingDeleteDialogComponent],
})
export class SettingModule {}
