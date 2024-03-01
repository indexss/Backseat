import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FolderEntryComponent } from './list/folder-entry.component';
import { FolderEntryDetailComponent } from './detail/folder-entry-detail.component';
import { FolderEntryUpdateComponent } from './update/folder-entry-update.component';
import { FolderEntryDeleteDialogComponent } from './delete/folder-entry-delete-dialog.component';
import { FolderEntryRoutingModule } from './route/folder-entry-routing.module';

@NgModule({
  imports: [SharedModule, FolderEntryRoutingModule],
  declarations: [FolderEntryComponent, FolderEntryDetailComponent, FolderEntryUpdateComponent, FolderEntryDeleteDialogComponent],
})
export class FolderEntryModule {}
