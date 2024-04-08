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
import { Component, OnInit } from '@angular/core';
import { getRecentlyListenedTracks } from './getRecentlyListenedTracks';

@Component({
  selector: 'jhi-discover',
  templateUrl: './leaderboard.discover.html',
  styleUrls: ['./leaderboard.discover.scss'],
})
export class RecentlyListenedComponent implements OnInit {
  trackURI = 'erg';
  trackLink = '/rating/'.concat(this.trackURI);
  Track: TrackResponse[] = [];
  constructor(private recentlyListenedTracksService: getRecentlyListenedTracks) {}

  ngOnInit(): void {
    this.recentlyListenedTracksService.getTrack().subscribe(
      data => {
        console.log('data: ');
        console.log(data);
        this.Track.push(data);
      },
      error => {
        // Handle errors here
        console.error(error);
      }
    );
  }
}
