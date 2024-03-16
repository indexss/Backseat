import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToFolderService {
  constructor(private http: HttpClient) {}

  addFolder(folderName: string, imageURL: string): Observable<any> {
    const url = 'api/folder/addfolder';
    const body = {
      folderName: folderName,
      imageURL: imageURL,
    };

    return this.http.post(url, body);
  }

  getUserFolder(): Observable<any> {
    return this.http.get('api/folder/fetchfolders');
  }
}
