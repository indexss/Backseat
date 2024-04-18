import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'app/mobile/device.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';

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
  isMobile: boolean = false;

  constructor(private deviceService: DeviceService, private http: HttpClient, private appConfig: ApplicationConfigService) {}

  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

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
  }
}
