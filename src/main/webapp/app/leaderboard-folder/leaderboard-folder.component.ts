import { Component, OnInit } from '@angular/core';
import { LeaderboardFolderService } from './leaderboard-folder.service';

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
  selector: 'jhi-leaderboard-folder',
  templateUrl: './leaderboard-folder.component.html',
  styleUrls: ['./leaderboard-folder.component.scss'],
})
export class LeaderboardFolderComponent implements OnInit {
  page = 1;
  pageSize = 10;
  trackURI = 'asd';
  trackLink = '/rating/'.concat(this.trackURI);
  recordList: Record[] = [];

  constructor(private leaderboardFolderService: LeaderboardFolderService) {}

  ngOnInit(): void {
    this.leaderboardFolderService.getTrackLeaderboard().subscribe(data => {
      console.log('data: ');
      console.log(data);
      // this.recordList = data;
      // console.log('recordList: ');
      // console.log(this.recordList);
      this.recordList = data.data.leaderboard;
    });
  }
}
