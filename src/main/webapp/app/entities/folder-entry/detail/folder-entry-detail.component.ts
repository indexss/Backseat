import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFolderEntry } from '../folder-entry.model';

@Component({
  selector: 'jhi-folder-entry-detail',
  templateUrl: './folder-entry-detail.component.html',
})
export class FolderEntryDetailComponent implements OnInit {
  folderEntry: IFolderEntry | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ folderEntry }) => {
      this.folderEntry = folderEntry;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
