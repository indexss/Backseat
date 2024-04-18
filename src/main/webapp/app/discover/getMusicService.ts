import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecentlyReviewedService {
  constructor(private http: HttpClient) {}
  fetchRecentTrack(): Observable<any> {
    return this.http.get('api/discover/track'); //TODO i think this needs editing
  }
}
