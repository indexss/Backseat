import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FetchTrackLeaderboardService } from './fetch-track-leaderboard.service';

interface Record {
  id: number;
  trackName: string;
  album: string;
  reviews: number;
  rating: number;
  artist: string;
  trackURI: string;
  imgURL: string;
}

@Component({
  selector: 'jhi-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  page = 1;
  pageSize = 10;
  trackURI = 'asd';
  trackLink = '/rating/'.concat(this.trackURI);
  recordList: Record[] = [];

  constructor(private fetchTrackLeaderboardService: FetchTrackLeaderboardService) {}

  ngOnInit(): void {
    this.fetchTrackLeaderboardService.getTrackLeaderboard().subscribe(data => {
      console.log('data: ');
      console.log(data);
      // this.recordList = data;
      // console.log('recordList: ');
      // console.log(this.recordList);
      this.recordList = data.data.leaderboard;
    });
  }
}
