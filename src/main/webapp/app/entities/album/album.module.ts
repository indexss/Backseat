import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlbumComponent } from './list/album.component';
import { AlbumDetailComponent } from './detail/album-detail.component';
import { AlbumUpdateComponent } from './update/album-update.component';
import { AlbumDeleteDialogComponent } from './delete/album-delete-dialog.component';
import { AlbumRoutingModule } from './route/album-routing.module';

@NgModule({
  imports: [SharedModule, AlbumRoutingModule],
  declarations: [AlbumComponent, AlbumDetailComponent, AlbumUpdateComponent, AlbumDeleteDialogComponent],
})
export class AlbumModule {}
