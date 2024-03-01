import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FolderComponent } from './list/folder.component';
import { FolderDetailComponent } from './detail/folder-detail.component';
import { FolderUpdateComponent } from './update/folder-update.component';
import { FolderDeleteDialogComponent } from './delete/folder-delete-dialog.component';
import { FolderRoutingModule } from './route/folder-routing.module';

@NgModule({
  imports: [SharedModule, FolderRoutingModule],
  declarations: [FolderComponent, FolderDetailComponent, FolderUpdateComponent, FolderDeleteDialogComponent],
})
export class FolderModule {}
