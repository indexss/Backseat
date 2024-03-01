import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFolder } from '../folder.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-folder-detail',
  templateUrl: './folder-detail.component.html',
})
export class FolderDetailComponent implements OnInit {
  folder: IFolder | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ folder }) => {
      this.folder = folder;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
