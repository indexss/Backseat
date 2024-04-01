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
export class FetchTrackLeaderboardService {
  constructor(private http: HttpClient) {}
  getTrackLeaderboard(params: TrackLeaderboardQueryParams): Observable<any> {
    const query = new URLSearchParams(params as any).toString();
    // console.log(`api/leaderboard/filter?${query}`);
    return this.http.get(`api/leaderboard/filter?${query}`);
  }
}
