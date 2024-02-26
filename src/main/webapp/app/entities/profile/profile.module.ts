import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './list/profile.component';
import { ProfileDetailComponent } from './detail/profile-detail.component';
import { ProfileUpdateComponent } from './update/profile-update.component';
import { ProfileDeleteDialogComponent } from './delete/profile-delete-dialog.component';
import { ProfileRoutingModule } from './route/profile-routing.module';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [ProfileComponent, ProfileDetailComponent, ProfileUpdateComponent, ProfileDeleteDialogComponent],
})
export class ProfileModule {}
