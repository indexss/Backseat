import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';
import { Observable } from 'rxjs';
import { Dayjs } from 'dayjs';

interface listItem {
  spotifyURI: string;
  userID: string;
  addTime: Dayjs;
}

@Injectable({
  providedIn: 'root',
})
export class WantToListenService {
  constructor(protected http: HttpClient) {}

  addNewItem(itemURI: string, userID: string): Observable<any> {
    const body: listItem = {
      spotifyURI: itemURI,
      userID: userID,
      addTime: dayjs(),
    };
    console.log(body);
    return this.http.post('api/want-to-listen-list-entries', body);
  }

  getAllEntries(): Observable<any> {
    return this.http.get('api/want-to-listen-list/all');
  }

  getUserEntries(userID: string): Observable<any> {
    return this.http.get(`api/want-to-listen-list/user?${userID}`);
  }
}
