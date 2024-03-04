import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import { DiscoverComponent } from './discover/discover.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SearchComponent } from './search/search.component';
import { RatingComponent } from './rating/rating.component';
import { RatingNotFoundComponent } from './rating/rating-not-found/rating-not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'search',
          component: SearchComponent,
          data: {
            authorities: [],
          },
        },

        {
          path: 'leaderboard',
          component: LeaderboardComponent,
          data: {
            authorities: [],
          },
        },

        {
          path: 'discover',
          component: DiscoverComponent,
          data: {
            authorities: [],
          },
        },

        // {
        //   path: 'rating',
        //   component: RatingComponent,
        //   data: {
        //     authorities: [],
        //   },
        // },

        {
          path: 'rating/:id',
          component: RatingComponent,
          data: {
            authorities: [],
          },
        },

        {
          path: 'rating-not-found',
          component: RatingNotFoundComponent,
          data: {
            authorities: [],
          },
        },

        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
