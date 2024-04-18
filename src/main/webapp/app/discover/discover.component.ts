import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs/esm';
import { RecentlyReviewedService } from './getMusicService';
import { getRecentlyListenedService } from './getRecentlyListenedService';
import { testService } from './test.service';
import { DeviceService } from 'app/mobile/device.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ITrack } from '../entities/track/track.model';
import { TrackService } from '../entities/track/service/track.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { IArtist } from '../entities/artist/artist.model';
import { IAlbum } from '../entities/album/album.model';
import { IProfile } from '../entities/profile/profile.model';
import { ReviewService } from '../entities/review/service/review.service';
import { IReview } from '../entities/review/review.model';
import { min } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

interface Rating {
  rating: number;
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
  page = 1;
  spotifyURI!: string;
  trackName: string = '';
  rating: Rating[] = [];

  constructor(
    private getMusicService: RecentlyReviewedService,
    private recentlyListenedTracksService: getRecentlyListenedService,
    private testing: testService,

    private http: HttpClient,
    private appConfig: ApplicationConfigService,

    private route: ActivatedRoute,
    private trackService: TrackService,
    private router: Router
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
    this.http.get<Rating>(this.appConfig.getEndpointFor('/api/discover/rating')).subscribe({
      next: (data: Rating) => {
        console.log('Response:', data);
        this.rating[0] = data;
        console.log(this.rating, '#########################################################################################');
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });

    this.http.get<Record[]>(this.appConfig.getEndpointFor('/api/discover/track')).subscribe({
      next: vowel => {
        this.recordList = vowel;
        console.log(this.recordList[0], '#########################################################################################');
      },
      error: err => {
        //error handling
        console.log('Error', err);
        alert(JSON.stringify(err));
      },
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
