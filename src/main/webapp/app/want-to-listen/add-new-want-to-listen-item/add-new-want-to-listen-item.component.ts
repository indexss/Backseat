import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';
import { WantToListenService } from '../want-to-listen.service';
import { WantToListenListEntryService } from '../../entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';
import { NewWantToListenListEntry } from '../../entities/want-to-listen-list-entry/want-to-listen-list-entry.model';

@Component({
  selector: 'jhi-add-new-want-to-listen-item',
  templateUrl: './add-new-want-to-listen-item.component.html',
  styleUrls: ['./add-new-want-to-listen-item.component.scss'],
})
export class AddNewWantToListenItemComponent implements OnInit {
  constructor(private service: WantToListenService, private http: HttpClient, private wtlEntryService: WantToListenListEntryService) {}

  ngOnInit(): void {}

  @Input() itemURI!: string;
  @Input() userID!: string;

  protected addNewItem(): void {
    const newEntry: NewWantToListenListEntry = {
      id: null,
      spotifyURI: 'testingURI',
      userID: 'testingUser',
    };

    console.log(this.wtlEntryService.create(newEntry));
    this.service.addNewItem(this.itemURI, this.userID).subscribe().unsubscribe();
    console.log('Adding item: ' + this.itemURI + 'to User: ' + this.userID);
  }

  protected readonly faPlusSquare = faPlusSquare;
}
