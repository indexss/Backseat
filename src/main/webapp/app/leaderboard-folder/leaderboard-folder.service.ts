import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardFolderService {
  constructor(private http: HttpClient) {}

  getTrackLeaderboard(): Observable<any> {
    return this.http.get('api/leaderboardfolder/track');
  }
}
