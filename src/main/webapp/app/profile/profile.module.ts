import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [ProfileComponent, ReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id/reviews',
        component: ReviewsComponent,
        data: {
          pageTitle: 'User reviews',
        },
      },
      {
        path: '',
        component: ProfileComponent,
        data: {
          pageTitle: 'User profile',
        },
      },
    ]),
  ],
})
export class ProfileModule {}
