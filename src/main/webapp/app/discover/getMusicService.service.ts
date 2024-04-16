import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetMusicServiceService {
  constructor(private http: HttpClient) {}
  getRecord(): Observable<any> {
    return this.http.get('api/discover/record');
  }
}
