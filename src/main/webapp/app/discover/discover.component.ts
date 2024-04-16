import { Component, OnInit } from '@angular/core';
import { RecentlyReviewedService } from './getMusicService.service';
import { ExploreFoldersService } from './getFoldersService.service';
import { DeviceService } from 'app/mobile/device.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
  username: string;
  imageURL: string;
}

@Component({
  selector: 'jhi-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  recordList: Record[] = [];
  isMobile: boolean = false;
  spotifyURI!: string;
  modalRef!: NgbModalRef; //unsure if needed
  folderList: Folder[] = [];

  //are these needed??
  faArrowUp = faArrowUp;

  constructor(
    private getMusicService: RecentlyReviewedService,
    private getFoldersService: ExploreFoldersService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.getMusicService.getRecord().subscribe(data => {
      this.recordList = data.data.discover;
    });

    this.getFoldersService.getFolders().subscribe(data => {
      this.folderList = data.data.discover;
    });
  }
  clear() {
    window.location.reload();
  }
}
