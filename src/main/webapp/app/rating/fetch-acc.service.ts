import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchAccService {
  constructor(private http: HttpClient) {}

  fetchAcc(): Observable<any> {
    return this.http.get(`api/rating/acc`);
  }
}
