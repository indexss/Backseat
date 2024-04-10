import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';
import { Observable } from 'rxjs';

interface listItem {
  spotifyURI: string;
  userID: string;
  addTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class WantToListenService {
  constructor(private http: HttpClient) {}

  addNewItem(itemURI: string, userID: string): void {
    const body: listItem = {
      spotifyURI: itemURI,
      userID: userID,
      addTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };

    console.log(body);
    this.http.post('/api/want-to-listen-list/post', body);
  }

  getAllEntries(): Observable<any> {
    return this.http.get('/api/want-to-listen-list/all');
  }
}
