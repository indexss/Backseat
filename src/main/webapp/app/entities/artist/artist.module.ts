import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ArtistComponent } from './list/artist.component';
import { ArtistDetailComponent } from './detail/artist-detail.component';
import { ArtistUpdateComponent } from './update/artist-update.component';
import { ArtistDeleteDialogComponent } from './delete/artist-delete-dialog.component';
import { ArtistRoutingModule } from './route/artist-routing.module';

@NgModule({
  imports: [SharedModule, ArtistRoutingModule],
  declarations: [ArtistComponent, ArtistDetailComponent, ArtistUpdateComponent, ArtistDeleteDialogComponent],
})
export class ArtistModule {}
