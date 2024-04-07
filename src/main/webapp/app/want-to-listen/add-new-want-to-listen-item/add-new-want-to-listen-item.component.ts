import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-add-new-want-to-listen-item',
  templateUrl: './add-new-want-to-listen-item.component.html',
  styleUrls: ['./add-new-want-to-listen-item.component.scss'],
})
export class AddNewWantToListenItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() itemURI!: string;

  protected addNewItem(itemURI: string): void {
    console.log('adding ' + itemURI);
  }

  protected readonly faPlusSquare = faPlusSquare;
}
