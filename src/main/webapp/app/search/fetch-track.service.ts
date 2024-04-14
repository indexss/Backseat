import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TrackLeaderboardQueryParams {
  category?: string;
  key?: string;
  startTime?: string;
  endTime?: string;
  order?: string;
  search?: string;
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class FetchTrackService {
  constructor(private http: HttpClient) {}

  getTrack(): Observable<any> {
    return this.http.get(`api/search/`);
  }
}
