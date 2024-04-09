import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class getRecentlyListenedService {
  constructor(private http: HttpClient) {}
  getTrack(): Observable<any> {
    return this.http.get('api/discover/recent');
  }
}
