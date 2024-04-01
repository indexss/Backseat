import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TrackComponent } from './list/track.component';
import { TrackDetailComponent } from './detail/track-detail.component';
import { TrackUpdateComponent } from './update/track-update.component';
import { TrackDeleteDialogComponent } from './delete/track-delete-dialog.component';
import { TrackRoutingModule } from './route/track-routing.module';

@NgModule({
  imports: [SharedModule, TrackRoutingModule],
  declarations: [TrackComponent, TrackDetailComponent, TrackUpdateComponent, TrackDeleteDialogComponent],
  exports: [TrackDetailComponent],
})
export class TrackModule {}
