import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';

@Component({
  selector: 'jhi-add-new-want-to-listen-item',
  templateUrl: './add-new-want-to-listen-item.component.html',
  styleUrls: ['./add-new-want-to-listen-item.component.scss'],
})
export class AddNewWantToListenItemComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  @Input() itemURI!: string;
  @Input() userID!: string;

  protected addNewItem(): void {
    const body = {
      spotifyURI: this.itemURI,
      userID: this.userID,
      now: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    };
    // sending http request
    this.http.post('api/want-to-listen-list', body);
    console.log('Adding item: ' + this.itemURI + 'to User: ' + this.userID);
    console.log(body);
  }

  protected readonly faPlusSquare = faPlusSquare;
}
