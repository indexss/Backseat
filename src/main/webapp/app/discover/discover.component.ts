import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs/esm';
import { DeviceService } from 'app/mobile/device.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { getRecentlyListenedService } from './getRecentlyListenedService';
import { getRatingService } from './getRatingService.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ITrack } from '../entities/track/track.model';
import { TrackService } from '../entities/track/service/track.service';
import { IArtist } from '../entities/artist/artist.model';
import { IAlbum } from '../entities/album/album.model';
import { IProfile } from '../entities/profile/profile.model';
import { ReviewService } from '../entities/review/service/review.service';
import { IReview } from '../entities/review/review.model';
import { min } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

interface Record {
  id: number;
  trackName?: string | null;
  album: string;
  rating: number;
  artist: string;
  trackURI?: string | null;
  albumURI?: string | null;
  imgURL: string;
}

interface Folder {
  id: number;
  folderId: number;
  folderName: string;
  username: string;
  image?: string | null;
}

interface Rating {
  rating: number;
}

interface test {
  test: string;
}

interface FullTrackResponse {
  track: {
    uri: string;
    name: string;
    id: string;
    durationMilliseconds: number;
    rating: number;

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
export class DiscoverComponent implements OnInit {
  page = 1;
  recordList: Record[] = [];
  spotifyURI!: string;
  trackName: string = '';
  folderList: Folder[] = [];
  isMobile: boolean = false;
  Track: RecentTrackResponse[] = [];
  Test: String[] = [];
  isSidebarOpen: boolean = false;
  rating: number[] = [];
  TrackandReview: FullTrackResponse[] = [];
  constructor(
    private deviceService: DeviceService,
    private http: HttpClient,
    private appConfig: ApplicationConfigService,
    private recentlyListenedTracksService: getRecentlyListenedService,
    private getRatingService: getRatingService,
    private trackService: TrackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    console.log(this.isMobile);

    this.http.get<Record[]>(this.appConfig.getEndpointFor('/api/discover/track')).subscribe({
      next: vowel => {
        this.recordList = vowel;
      },
      error: err => {
        //error handling
        alert(JSON.stringify(err));
      },
    });

    this.http.get<Folder[]>(this.appConfig.getEndpointFor('api/discover/folder')).subscribe({
      next: cons => {
        this.folderList = cons;
      },
      error: err => {
        alert(JSON.stringify(err));
      },
    });
    this.recentlyListenedTracksService.getTrack().subscribe({
      next: (data: RecentListenedTrackResponse) => {
        console.log('Response:', data);
        this.Track = data.items;
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
    this.recentlyListenedTracksService.getTrackRating().subscribe({
      next: (data: number[]) => {
        console.log('Response:', data);
        this.rating = data;
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
