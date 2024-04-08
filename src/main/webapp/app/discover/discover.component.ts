import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs/esm';
import { GetMusicService } from './getMusicService';
import { getRecentlyListenedTracks } from './getRecentlyListenedTracks';
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
interface TrackResponse {
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
}
interface Tester {
  name: string;
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
  Track: TrackResponse[] = [];
  Test: String[] = [];
  constructor(
    private getMusicService: GetMusicService,
    private recentlyListenedTracksService: getRecentlyListenedTracks,
    private testing: testService
  ) {}

  ngOnInit(): void {
    /*
    this.getMusicService.getRecord().subscribe(data => {
      console.log('data: ');
      console.log(data);
      // this.recordList = data;
      // console.log('recordList: ');
      // console.log(this.recordList);
      this.recordList = data.data.discover;
    },
    error => {
      // Handle errors here
      console.error(error);
    });
    this.recentlyListenedTracksService.getTrack().subscribe(
      data => {
          console.log('data: ');
          console.log(data);
          this.Track.push();
    },
    error => {
      // Handle errors here
      console.error(error);
    }
    );
    */
    this.testing.getTest().subscribe({
      next: (data: String) => {
        // Handle the data received from the HTTP request
        console.log('Response:', data);
        this.Test.push(data);
      },
      error: error => {
        // Handle errors if the HTTP request fails
        console.error('Error:', error);
      },
      complete: () => {
        // Optional: Handle completion of the observable stream
        console.log('Request completed');
      },
    });
  }
}
