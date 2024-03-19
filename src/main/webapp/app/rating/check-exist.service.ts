import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckExistService {
  constructor(private http: HttpClient) {}
  checkExist(id: number): Observable<any> {
    return this.http.get(`api/rating/check?id=${id}`);
  }
}
