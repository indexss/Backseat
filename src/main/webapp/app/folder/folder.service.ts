import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private http: HttpClient) {}

  getFolderEntry(id: number): Observable<any> {
    return this.http.get(`api/folder/fetchfolderentry?id=${id}`);
  }

  getNameImage(spotifyURI: string): Observable<any> {
    const url = 'api/folder/getnameimage';
    const body = {
      spotifyURI: spotifyURI,
    };
    return this.http.post(url, body);
  }
}
