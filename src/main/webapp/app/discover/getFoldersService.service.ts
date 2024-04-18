import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExploreFoldersService {
  constructor(private http: HttpClient) {}
  getFolders(): Observable<any> {
    return this.http.get(`api/discover/folder`); //this may be the problem???
  }
}
