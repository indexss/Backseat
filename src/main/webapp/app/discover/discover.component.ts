import { Component, OnInit } from '@angular/core';
import { RecentlyReviewedService } from './getMusicService.service';
import { ExploreFoldersService } from './getFoldersService.service';
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
import dayjs from 'dayjs/esm';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderService } from '../folder/folder.service';

/*
interface Review {
  id: number;
  rating?: number | null;
  content?: string | null;
  date?: dayjs.Dayjs | null;
  profile?: Pick<IProfile, 'id'> | null;
  track?: Pick<ITrack, 'spotifyURI'> | null;
  album?: Pick<IAlbum, 'spotifyURI'> | null;
}

interface ReviewedTrack {
  trackURI: string;
  name: string;
  rating: number;
  artists?: Pick<IArtist, 'spotifyURI'>[] | null;
  album?: Pick<IAlbum, 'spotifyURI'> | null;
}

interface RandFolder {
  folderId: number;
  name: string;
  image?: string | null;
  profile?: Pick<IProfile, 'id'> | null;
}

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class DiscoverComponent implements OnInit {
  protected recordList: ReviewedTrack[] = [];
  protected isMobile: boolean = false;
  protected folderList: RandFolder[] = [];
  protected reviews: Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private trackService: TrackService,
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) {}

  ngOnInit(): void {
    this.http.get<Review[]>(this.applicationConfigService.getEndpointFor('/api/reviews')).subscribe({
      next: (res) => {
        console.debug("Reviews", res);
        this.http.get<ReviewedTrack[]>(this.applicationConfigService.
        getEndpointFor('/api/tracks')).subscribe
        ({
          next: (trs) => {
            console.debug("Tracks", trs);
            this.recordList = [];
            let trackList= [];
            for(let i = 0; i < res.length && 50; i++) {
              let t = res[i].track;
              trackList.push(res[i].track);
              //TODO stop duplicates
            }

          }
        }
      },
      error: (err) => {
        alert("Get Reviews " + JSON.stringify(err));
      }
    });
  }
}
*/

interface Record {
  id: number;
  trackName: string;
  album: string;
  rating: number;
  artist: string;
  trackURI: string;
  imgURL: string;
}

interface Folder {
  id: number;
  folderId: number;
  folderName: string;
  userName: string;
  image: string;
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

  //are these needed??
  faArrowUp = faArrowUp;

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private folderService: FolderService,
    private router: Router,

    private getMusicService: RecentlyReviewedService,
    private getFoldersService: ExploreFoldersService,
    private deviceService: DeviceService,
    //private trackService: TrackService,
    private http: HttpClient,
    private appConfig: ApplicationConfigService
  ) {}

  ngOnInit(): void {
    /*this.getMusicService.getRecord().subscribe(
      data => {
        this.recordList = data.data.discover;
      })
    //this.getMusicService.getRecord();*/

    this.http.get<Record[]>(this.appConfig.getEndpointFor('/api/discover/track')).subscribe({
      next: vowel => {
        this.recordList = vowel;
      },
      error: err => {
        //error handling
        alert(JSON.stringify(err));
      },
    });
    // /folders may be the problem here
    this.http.get<Folder[]>(this.appConfig.getEndpointFor('api/discover/folder')).subscribe({
      next: cons => {
        this.folderList = cons;
      },
      error: err => {
        alert(JSON.stringify(err));
      },
    });

    //folders are not functional yet
    //this.getFoldersService.getFolders().subscribe(data => {
    //this.folderList = data.data.discover;
    //});
  }
}
