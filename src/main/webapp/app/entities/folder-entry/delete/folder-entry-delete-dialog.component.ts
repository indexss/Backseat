import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFolderEntry } from '../folder-entry.model';
import { FolderEntryService } from '../service/folder-entry.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './folder-entry-delete-dialog.component.html',
})
export class FolderEntryDeleteDialogComponent {
  folderEntry?: IFolderEntry;

  constructor(protected folderEntryService: FolderEntryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.folderEntryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
