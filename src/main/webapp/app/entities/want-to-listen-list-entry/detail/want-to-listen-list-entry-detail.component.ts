import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';

@Component({
  selector: 'jhi-want-to-listen-list-entry-detail',
  templateUrl: './want-to-listen-list-entry-detail.component.html',
})
export class WantToListenListEntryDetailComponent implements OnInit {
  wantToListenListEntry: IWantToListenListEntry | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wantToListenListEntry }) => {
      this.wantToListenListEntry = wantToListenListEntry;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
