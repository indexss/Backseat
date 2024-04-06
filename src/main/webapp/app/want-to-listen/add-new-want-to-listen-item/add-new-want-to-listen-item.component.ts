import { Component, OnInit } from '@angular/core';
import { faPlayCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-add-new-want-to-listen-item',
  templateUrl: './add-new-want-to-listen-item.component.html',
  styleUrls: ['./add-new-want-to-listen-item.component.scss'],
})
export class AddNewWantToListenItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  addNewItem(): void {}

  protected readonly faPlusSquare = faPlusSquare;
}
