import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';
import { Observable } from 'rxjs';
import { Dayjs } from 'dayjs';
import { AccountService } from '../core/auth/account.service';
import { ItemList } from './item-list.interface';

interface listItem {
  spotifyURI: string;
  userID: string;
  addTime: Dayjs;
}

@Injectable({
  providedIn: 'root',
})
export class WantToListenService {
  public userList: ItemList[] | undefined;

  constructor(protected http: HttpClient, private accService: AccountService) {}

  addNewItem(itemURI: string, userID: string): Observable<any> | null {
    this.getUserEntries(userID).subscribe(data => {
      this.userList = data.data.entryList;
    });
    // @ts-ignore
    for (let i = 0; i < userList.length; i++) {
      // userList is undefined TODO
      // @ts-ignore
      if (itemURI == userList[i].itemURI) {
        return null;
      }
    }

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
    console.log('userID: ' + userID);
    return this.http.get(`api/want-to-listen-list/user?userID=${userID}`);
  }

  delEntry(entryID: number): Observable<any> {
    console.log('Delete Entry : ' + entryID);
    return this.http.delete(`api/want-to-listen-list-entries/${entryID}`);
  }

  createList(userName: string): Observable<any> {
    return this.http.get(`api/want-to-listen-list/create-list?userName=${userName}`);
  }
}
