import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import format from '@popperjs/core/lib/utils/format';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import getDocumentElement from '@popperjs/core/lib/dom-utils/getDocumentElement';
import { IWantToListenListEntry } from '../../entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { HttpResponse } from '@angular/common/http';
import { WantToListenListEntryService } from '../../entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';

import { HttpClient } from '@angular/common/http';
import { SortService } from '../../shared/sort/sort.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface listItem {
  id: number;
  trackName: string;
  artist: string;
  album: string;
  reviews: number;
  rating: number;
  trackURI: string;
  addTime?: Date;
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

  showDeleteIcon: boolean = false;

  faTrash = faTrash;
  constructor(
    protected activatedRoute: ActivatedRoute,
    private wantToListenListEntryService: WantToListenListEntryService,
    public router: Router,
    protected http: HttpClient,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadAll();
    console.log(this.itemList);
  }
  loadAll(): void {
    this.http.get('api/want-to-listen-list-entries');
  }

  //更改focus状态
  // focus(e: Event): void {
  //   // On mouse over
  // }
  onMouseEnter(): void {
    this.showDeleteIcon = true;
  }

  onMouseLeave(): void {
    this.showDeleteIcon = false;
  }
  deleteItem(id: number): void {
    const confirmDeletion = confirm('Are you sure you want to delete this item?');
    if (confirmDeletion) {
      this.wantToListenListEntryService.delete(id).subscribe({
        next: () => {
          console.log('Deletion successful');
          this.loadAll(); // 重新加载列表以反映删除
        },
        error: () => {
          console.error('There was an error deleting the item');
          // 这里可以添加更多用户友好的错误处理逻辑
        },
      });
    }
  }
  // showDeleteNotification(deletedItem: listItem): void {
  //   alert(`Item ${deletedItem.trackName} deleted`);
  //   setTimeout(() => {
  //     console.log("The option to undo the deletion has expired.");
  //   }, 3000); // 模拟3秒后删除提示消失
  // }

  expand(e: Event): void {
    //On mouse click
  }

  protected readonly format = format;
}
