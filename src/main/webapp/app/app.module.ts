import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { NavbarNewComponent } from './layouts/navbar-new/navbar-new.component';
import { DiscoverComponent } from './discover/discover.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SearchComponent } from './search/search.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';
import { RatingNotFoundComponent } from './rating/rating-not-found/rating-not-found.component';
import { FolderComponent } from './folder/folder.component';
import { AddToFolderComponent } from './add-to-folder/add-to-folder.component';
import { LeaderboardFolderComponent } from './leaderboard-folder/leaderboard-folder.component';
import { WantToListenComponent } from './want-to-listen/want-to-listen.component';
import { ListViewComponent } from './want-to-listen/list-view/list-view.component';

//For search bar I(Finn) import ng2 search filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    Ng2SearchPipeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent,
    NavbarNewComponent,
    DiscoverComponent,
    LeaderboardComponent,
    SearchComponent,
    RatingComponent,
    RatingNotFoundComponent,
    FolderComponent,
    AddToFolderComponent,
    LeaderboardFolderComponent,
    WantToListenComponent,
    ListViewComponent,
  ],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
