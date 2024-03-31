import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToFolderService {
  constructor(private http: HttpClient) {}

  addFolder(folderName: string): Observable<any> {
    const url = 'api/folder/addfolder';
    const body = {
      folderName: folderName,
    };
    return this.http.post(url, body);
  }

  deleteFolder(folderId: number): Observable<any> {
    const url = 'api/folder/deletefolder';
    const body = {
      folderId: folderId,
    };
    return this.http.post(url, body);
  }
  getUserFolder(): Observable<any> {
    return this.http.get('api/folder/fetchfolders');
  }

  addEntryFolder(spotifyURI: string, folderId: number): Observable<any> {
    const url = 'api/folder/addentrytofolder';
    const body = {
      spotifyURI: spotifyURI,
      folderId: folderId,
    };
    return this.http.post(url, body);
  }
}
