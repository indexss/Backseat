import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class testService {
  constructor(private http: HttpClient) {}
  getTest(): Observable<any> {
    return this.http.get('api/discover/test');
  }
}
