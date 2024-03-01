import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WantToListenListEntryComponent } from './list/want-to-listen-list-entry.component';
import { WantToListenListEntryDetailComponent } from './detail/want-to-listen-list-entry-detail.component';
import { WantToListenListEntryUpdateComponent } from './update/want-to-listen-list-entry-update.component';
import { WantToListenListEntryDeleteDialogComponent } from './delete/want-to-listen-list-entry-delete-dialog.component';
import { WantToListenListEntryRoutingModule } from './route/want-to-listen-list-entry-routing.module';

@NgModule({
  imports: [SharedModule, WantToListenListEntryRoutingModule],
  declarations: [
    WantToListenListEntryComponent,
    WantToListenListEntryDetailComponent,
    WantToListenListEntryUpdateComponent,
    WantToListenListEntryDeleteDialogComponent,
  ],
})
export class WantToListenListEntryModule {}
