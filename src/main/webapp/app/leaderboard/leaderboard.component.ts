import { Component, OnInit, HostListener, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FetchTrackLeaderboardService } from './fetch-track-leaderboard.service';
import { DeviceService } from 'app/mobile/device.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

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
  pageSize: number = 10;
  isLoading = false;
  hasMore = true;
  recordList: Record[] = [];
  ismobile: boolean = false;
  isCollapsed = true;

  filter = {
    category: 'track',
    orderBy: 'rating',
    timeSpan: 'whole',
    order: 'DESC',
    textInput: '',
  };

  constructor(private fetchTrackLeaderboardService: FetchTrackLeaderboardService, private deviceService: DeviceService) {}
  submitForm(): void {
    console.log(this.filter);
    this.page = 0;
    // this.isCollapsed = true;
    this.recordList = [];
  }

  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.ismobile = true;
    } else {
      this.ismobile = false;
    }

    this.fetchTrackLeaderboardService.getTrackLeaderboard(this.page, 50).subscribe(data => {
      console.log('123123123123123123123');
      this.page = 0;
      console.log('page init:', this.page);
      // this.recordList = data.data.leaderboard;
      this.addAllWithAnimation(data.data.leaderboard);
      this.pageSize = 10;
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
    while (pos >= (max / 9) * 8 && !this.isLoading && this.hasMore) {
      console.log('pos1:', pos);
      console.log('max1:', max);
      this.isLoading = true;
      console.log('You are at the bottom!');
      this.fetchTrackLeaderboardService.getTrackLeaderboard(this.page, this.pageSize).subscribe(
        data => {
          console.log('more data2:', data.data.leaderboard);
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
