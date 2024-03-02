import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpotifyConnection } from '../spotify-connection.model';
import { SpotifyConnectionService } from '../service/spotify-connection.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './spotify-connection-delete-dialog.component.html',
})
export class SpotifyConnectionDeleteDialogComponent {
  spotifyConnection?: ISpotifyConnection;

  constructor(protected spotifyConnectionService: SpotifyConnectionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.spotifyConnectionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
