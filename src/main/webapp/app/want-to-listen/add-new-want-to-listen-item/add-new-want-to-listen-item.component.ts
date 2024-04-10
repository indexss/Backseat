import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs/esm';
import { WantToListenService } from '../want-to-listen.service';

@Component({
  selector: 'jhi-add-new-want-to-listen-item',
  templateUrl: './add-new-want-to-listen-item.component.html',
  styleUrls: ['./add-new-want-to-listen-item.component.scss'],
})
export class AddNewWantToListenItemComponent implements OnInit {
  constructor(private service: WantToListenService) {}

  ngOnInit(): void {}

  @Input() itemURI!: string;
  @Input() userID!: string;

  protected addNewItem(): void {
    this.service.addNewItem(this.itemURI, this.userID);
    console.log('Adding item: ' + this.itemURI + 'to User: ' + this.userID);
  }

  protected readonly faPlusSquare = faPlusSquare;
}
