import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchTrackLeaderboardService {
  constructor(private http: HttpClient) {}
  getTrackLeaderboard(page: number, size: number): Observable<any> {
    return this.http.get(`api/leaderboard/track/pagination?page=${page}&size=${size}`);
  }
}
