import { Component, OnInit, HostListener, PipeTransform, TemplateRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { endWith, map, startWith } from 'rxjs/operators';
import { FetchTrackLeaderboardService } from './fetch-track-leaderboard.service';
import { DeviceService } from 'app/mobile/device.service';
import { NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../core/auth/account.service';
import { AddToFolderService } from '../add-to-folder/add-to-folder.service';

interface Record {
  id: number;
  trackName: string;
  album: string;
  reviews: number;
  rating: number;
  artist: string;
  trackURI: string;
  imgURL: string;
  newItem?: boolean;
}

interface Folder {
  id: number;
  folderId: number;
  folderName: string;
  imageURL: string;
}

@Component({
  selector: 'jhi-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  page: number = 0;
  pageSize: number = 30;
  isLoading = false;
  hasMore = true;
  recordList: Record[] = [];
  ismobile: boolean = false;
  isCollapsed = true;
  spotifyURI!: string;
  modalRef!: NgbModalRef;
  folderList: Folder[] = [];

  faFilter = faFilter;
  faSquarePlus = faSquarePlus;
  faArrowUp = faArrowUp;

  submitForm(): void {
    // console.log('submitForm1');
    // console.log(this.filter);
    if (this.filter.category === 'album') {
      this.isAlbum = true;
    } else {
      this.isAlbum = false;
    }
    this.page = 0;
    // this.isCollapsed = true;
    this.recordList = [];
    setTimeout(() => {
      // console.log('22222222222222222222222');
      this.continueLoading();
    }, 300);
  }

  isAlbum = false;

  filter = {
    category: 'track',
    orderBy: 'rating',
    // timeSpan: 'whole',
    startTime: '1800-01-01',
    endTime: this.getTodayDate(),
    order: 'desc',
    textInput: '',
  };

  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  constructor(
    private fetchTrackLeaderboardService: FetchTrackLeaderboardService,
    private deviceService: DeviceService,
    private modalService: NgbModal,
    private accountService: AccountService,
    private addToFolderService: AddToFolderService
  ) {}

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.ismobile = true;
    } else {
      this.ismobile = false;
    }

    this.addToFolderService.getUserFolder().subscribe(data => {
      this.folderList = data.data.folder;
    });

    this.fetchTrackLeaderboardService
      .getTrackLeaderboard({
        page: this.page,
        size: 30,
      })
      .subscribe(data => {
        // console.log('123123123123123123123');
        this.page = 0;
        // console.log('page init:', this.page);
        // this.recordList = data.data.leaderboard;
        this.addAllWithAnimation(data.data.leaderboard);
        this.pageSize = 30;
        this.page += 1;
      });
  }

  openModal(spotifyURI: string, content: TemplateRef<any>): void;
  openModal(content: TemplateRef<any>): void;

  openModal(arg1: any, arg2?: any): void {
    if (typeof arg1 === 'string') {
      // 处理第一个重载的情况
      this.spotifyURI = arg1;
      this.modalRef = this.modalService.open(arg2, { centered: true });
    } else {
      // 处理第二个重载的情况
      this.modalService.open(arg1, { centered: true });
    }
  }

  addToFolder(folderId: number) {
    console.log(`Adding trackURI: ${this.spotifyURI} to folderId: ${folderId}`);
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.addToFolderService.addEntryFolder(this.spotifyURI, folderId).subscribe(data => {});
      }
    });
    this.modalRef.close();
  }

  addAllWithAnimation(records: Record[]) {
    records.forEach((item, index) => {
      setTimeout(() => {
        this.recordList.push({ ...item, newItem: true });
      }, index * 100);
    });
  }

  continueLoading() {
    this.isLoading = true;
    // console.log('You are at the bottom123!');
    this.fetchTrackLeaderboardService
      .getTrackLeaderboard({
        category: this.filter.category,
        key: this.filter.orderBy,
        startTime: this.filter.startTime,
        endTime: this.filter.endTime,
        order: this.filter.order,
        search: this.filter.textInput,
        page: this.page,
        size: 30,
      })
      .subscribe(
        data => {
          // console.log('more data2222:', data.data.leaderboard);
          // this.recordList = [...this.recordList, ...data.data.leaderboard];
          const newData = data.data.leaderboard.map((item: Record) => ({ ...item, newItem: true }));
          this.recordList = [...this.recordList, ...newData];
          this.page += 1;
          this.isLoading = false;
          // if (data.data.leaderboard.length < this.pageSize) {
          //   // this.hasMore = false;
          // }
          // if (data.data.leaderboard.length === 0) {
          //   this.hasMore = false;
          // }
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  clear() {
    //刷新网页
    window.location.reload();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = window.scrollY + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      if (this.recordList.length < this.pageSize) {
        this.hasMore = false;
      } else {
        this.hasMore = true;
      }
    }
    if (pos >= max && !this.isLoading && this.hasMore) {
      // console.log('pos1:', pos);
      // console.log('max1:', max);
      // console.log('page1:', this.page);
      // console.log("category1:", this.filter.category);
      // console.log("key1:", this.filter.orderBy);
      // console.log("startTime1:", this.filter.startTime);
      // console.log("endTime1:", this.filter.endTime);
      // console.log("order1:", this.filter.order);
      // console.log("search1:", this.filter.textInput);
      // console.log('1111111111111111111111111');
      this.continueLoading();
    }
  }

  scrollToTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
