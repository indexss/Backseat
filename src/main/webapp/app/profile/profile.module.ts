import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RedirectorComponent } from './redirector/redirector.component';

@NgModule({
  declarations: [ProfileComponent, ReviewsComponent, RedirectorComponent],
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
        path: ':id',
        component: ProfileComponent,
        data: {
          pageTitle: 'User profile',
        },
      },
      {
        path: '',
        component: RedirectorComponent,
      },
    ]),
  ],
})
export class ProfileModule {}
