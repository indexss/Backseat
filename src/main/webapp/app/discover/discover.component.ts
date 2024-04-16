import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs/esm';
import { GetMusicService } from './getMusicService';
import { getRecentlyListenedService } from './getRecentlyListenedService';
import { testService } from './test.service';

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

interface Review {
  id: number;
  date: dayjs.Dayjs;
}

interface RecentTrackResponse {
  track: {
    uri: string;
    name: string;
    id: string;
    durationMilliseconds: number;

    album: {
      album_type: string;
      id: string;
      name: string;
      uri: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    };

    artists: {
      uri: string;
      name: string;
      id: string;
    }[];
  };
}
interface RecentListenedTrackResponse {
  items: {
    track: {
      uri: string;
      name: string;
      id: string;
      durationMilliseconds: number;

      album: {
        album_type: string;
        id: string;
        name: string;
        uri: string;
        images: {
          url: string;
          height: number;
          width: number;
        }[];
      };

      artists: {
        uri: string;
        name: string;
        id: string;
      }[];
    };
  }[];
}
@Component({
  selector: 'jhi-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})

//need to implement getting a record based on date in Review
export class DiscoverComponent implements OnInit {
  trackURI = 'erg';
  trackLink = '/rating/'.concat(this.trackURI);
  recordList: Record[] = [];
  Track: RecentTrackResponse[] = [];
  Test: String[] = [];
  isSidebarOpen: boolean = false;

  constructor(
    private getMusicService: GetMusicService,
    private recentlyListenedTracksService: getRecentlyListenedService,
    private testing: testService
  ) {}

  ngOnInit(): void {
    this.recentlyListenedTracksService.getTrack().subscribe({
      next: (data: RecentListenedTrackResponse) => {
        console.log('Response:', data);
        this.Track = data.items;
        console.log(this.Track[0].track.name, '#########################################################################################');
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
