import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReviewComponent } from './list/review.component';
import { ReviewDetailComponent } from './detail/review-detail.component';
import { ReviewUpdateComponent } from './update/review-update.component';
import { ReviewDeleteDialogComponent } from './delete/review-delete-dialog.component';
import { ReviewRoutingModule } from './route/review-routing.module';

@NgModule({
  imports: [SharedModule, ReviewRoutingModule],
  declarations: [ReviewComponent, ReviewDetailComponent, ReviewUpdateComponent, ReviewDeleteDialogComponent],
})
export class ReviewModule {}
