import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';
import { WantToListenListEntryService } from '../service/want-to-listen-list-entry.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './want-to-listen-list-entry-delete-dialog.component.html',
})
export class WantToListenListEntryDeleteDialogComponent {
  wantToListenListEntry?: IWantToListenListEntry;

  constructor(protected wantToListenListEntryService: WantToListenListEntryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wantToListenListEntryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
