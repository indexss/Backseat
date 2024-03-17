import { Component, OnInit } from '@angular/core';
import format from '@popperjs/core/lib/utils/format';
import getDocumentElement from '@popperjs/core/lib/dom-utils/getDocumentElement';

interface listItem {
  id: number;
  trackName: string;
  artist: string;
  album: string;
  reviews: number;
  rating: number;
  trackURI: string;
  imgURL?: string;
  releaseDate?: Date;
  isFocus?: boolean;
}

@Component({
  selector: 'jhi-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss', '../want-to-listen.component.scss'],
})
export class ListViewComponent implements OnInit {
  itemList: listItem[] = [
    {
      id: 1,
      album: 'radical Montana',
      artist: 'Data initiatives',
      rating: 5,
      reviews: 2234551,
      trackName: 'Track 1',
      trackURI: 'grw3rghber31',
      releaseDate: new Date('22-Feb-2024'),
      isFocus: false,
    },
    {
      id: 2,
      album: 'Album Name',
      artist: 'Artist Name',
      rating: 4.5,
      reviews: 433222,
      trackName: 'Track 2',
      trackURI: 'fmjioho8g6',
      isFocus: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  focus(e: Event): void {
    // On mouse over
  }
  expand(e: Event): void {
    //On mouse click
  }

  protected readonly format = format;
}
