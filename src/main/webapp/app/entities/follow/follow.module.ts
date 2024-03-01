import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FollowComponent } from './list/follow.component';
import { FollowDetailComponent } from './detail/follow-detail.component';
import { FollowUpdateComponent } from './update/follow-update.component';
import { FollowDeleteDialogComponent } from './delete/follow-delete-dialog.component';
import { FollowRoutingModule } from './route/follow-routing.module';

@NgModule({
  imports: [SharedModule, FollowRoutingModule],
  declarations: [FollowComponent, FollowDetailComponent, FollowUpdateComponent, FollowDeleteDialogComponent],
})
export class FollowModule {}
