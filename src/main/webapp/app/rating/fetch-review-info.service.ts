import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchReviewInfoService {
  constructor(private http: HttpClient) {}

  getReviewInfo(id: number): Observable<any> {
    return this.http.get(`api/reivews?id=${id}`);
  }
}
