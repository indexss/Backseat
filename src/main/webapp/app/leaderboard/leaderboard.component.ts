import { Component, OnInit, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FetchTrackLeaderboardService } from './fetch-track-leaderboard.service';
import { DeviceService } from 'app/mobile/device.service';

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

@Component({
  selector: 'jhi-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  page: number = 0;
  pageSize: number = 7;
  isLoading = false;
  hasMore = true;
  recordList: Record[] = [];
  ismobile: boolean = false;

  constructor(private fetchTrackLeaderboardService: FetchTrackLeaderboardService, private deviceService: DeviceService) {}

  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      // console.log('用户在使用手机设备访问');
      this.ismobile = true;
    } else {
      // console.log('用户在使用非手机设备访问');
    }

    this.fetchTrackLeaderboardService.getTrackLeaderboard(this.page, this.pageSize).subscribe(data => {
      this.page = 0;
      this.pageSize = 7;
      console.log('page init:', this.page);
      // this.recordList = data.data.leaderboard;
      this.addAllWithAnimation(data.data.leaderboard);
      this.page += 1;
    });
  }

  addAllWithAnimation(records: Record[]) {
    records.forEach((item, index) => {
      setTimeout(() => {
        this.recordList.push({ ...item, newItem: true });
      }, index * 100);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = window.scrollY + window.innerHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max && !this.isLoading && this.hasMore) {
      this.isLoading = true;
      console.log('You are at the bottom!');
      this.fetchTrackLeaderboardService.getTrackLeaderboard(this.page, this.pageSize).subscribe(
        data => {
          console.log('more data:', data.data.leaderboard);
          // this.recordList = [...this.recordList, ...data.data.leaderboard];
          const newData = data.data.leaderboard.map((item: Record) => ({ ...item, newItem: true }));
          this.recordList = [...this.recordList, ...newData];
          this.page += 1;
          this.isLoading = false;
          if (data.data.leaderboard.length < this.pageSize) {
            this.hasMore = false;
          }
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  scrollToTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
