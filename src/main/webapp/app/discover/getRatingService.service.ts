import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})

/*export class RecentlyReviewedService {
  constructor(private http: HttpClient, private appConfig: ApplicationConfigService) {}
  getRecord(): Observable<any> {
    return this.http.get(this.appConfig.getEndpointFor('/api/discover/recents'));
  }
}*/
export class getRatingService {
  constructor(private http: HttpClient) {}
  getTrackRating(): Observable<any> {
    return this.http.get('/api/discover/rating');
    //return this.http.get('/api/discover/rating');
  }
}
