import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SpotifyConnectionComponent } from './list/spotify-connection.component';
import { SpotifyConnectionDetailComponent } from './detail/spotify-connection-detail.component';
import { SpotifyConnectionUpdateComponent } from './update/spotify-connection-update.component';
import { SpotifyConnectionDeleteDialogComponent } from './delete/spotify-connection-delete-dialog.component';
import { SpotifyConnectionRoutingModule } from './route/spotify-connection-routing.module';

@NgModule({
  imports: [SharedModule, SpotifyConnectionRoutingModule],
  declarations: [
    SpotifyConnectionComponent,
    SpotifyConnectionDetailComponent,
    SpotifyConnectionUpdateComponent,
    SpotifyConnectionDeleteDialogComponent,
  ],
})
export class SpotifyConnectionModule {}
