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

  deleteFolderEntry(spotifyURI: string, folderId: number): Observable<any> {
    const url = 'api/folder/deletefolderentry';
    const body = {
      spotifyURI: spotifyURI,
      folderId: folderId,
    };
    return this.http.post(url, body);
  }
}
