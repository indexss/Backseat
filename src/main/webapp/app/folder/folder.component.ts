import { Component, OnInit } from '@angular/core';
import { FetchTrackLeaderboardService } from '../leaderboard/fetch-track-leaderboard.service';
import { FolderService } from './folder.service';

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

interface Result {
  name: string;
  artist: string;
  imgURL: string;
  trackURI: string;
  albumURI: string;
}
@Component({
  selector: 'jhi-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  page = 1;
  pageSize = 10;
  trackURI = 'asd';
  trackLink = '/rating/'.concat(this.trackURI);
  recordList: Record[] = [];
  imageUrl: string = 'https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg';
  folderName: string = 'New Folder';

  constructor(private fetchTrackLeaderboardService: FetchTrackLeaderboardService) {}

  ngOnInit(): void {
    this.fetchTrackLeaderboardService.getTrackLeaderboard().subscribe(data => {
      this.recordList = data.data.leaderboard;
    });
  }

  openDialog() {
    const newName = prompt('Enter the new playlist name (max 9 characters):', this.folderName);
    if (newName !== null) {
      this.folderName = newName.substring(0, 9);
    }
  }
}
