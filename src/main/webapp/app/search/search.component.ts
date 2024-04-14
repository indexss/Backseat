import { Component, OnInit, TemplateRef } from '@angular/core';
import { FetchTrackService } from './fetch-track.service';

import { DeviceService } from 'app/mobile/device.service';
import { NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faFilter, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../core/auth/account.service';
import { AddToFolderService } from '../add-to-folder/add-to-folder.service';

// basically most of the code is from leaderboard which is tons of work from Larry Shi

interface Record {
  id: number;
  trackName: string;
  album: string;
  reviews: number;
  rating: number;
  artist: string;
  trackURI: string;
  imgURL: string;
  newItem?: boolean;
}
@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchText: any;
  recordList: Record[] = [];
  isAlbum = false;
  spotifyURI!: string;
  modalRef!: NgbModalRef;
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco', country: 'USA' },
    { id: 13, name: 'Bombasto', country: 'UK' },
    { id: 14, name: 'Celeritas', country: 'Canada' },
    { id: 15, name: 'Magenta', country: 'Russia' },
    { id: 16, name: 'RubberMan', country: 'China' },
    { id: 17, name: 'Dynama', country: 'Germany' },
    { id: 18, name: 'Dr IQ', country: 'Hong Kong' },
    { id: 19, name: 'Magma', country: 'South Africa' },
    { id: 20, name: 'Tornado', country: 'Sri Lanka' },
  ];
  constructor(private fetchTrackService: FetchTrackService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchTrackService.getTrack().subscribe(
      data => {
        // Assuming data.data.leaderboard is the correct path to your records
        const newData: Record[] = data.data.leaderboard.map((item: any) => ({
          id: item.id,
          trackName: item.trackName,
          album: item.album,
          reviews: item.reviews,
          rating: item.rating,
          artist: item.artist,
          trackURI: item.trackURI,
          imgURL: item.imgURL,
          newItem: true, // Assuming you want to set newItem to true for the animation
        }));
        this.recordList = newData;
      },
      error => {
        // Handle any errors here
        console.error('There was an error fetching the tracks', error);
      }
    );
  }

  openModal(spotifyURI: string, content: TemplateRef<any>): void;
  openModal(content: TemplateRef<any>): void;

  openModal(arg1: any, arg2?: any): void {
    if (typeof arg1 === 'string') {
      // 处理第一个重载的情况
      this.spotifyURI = arg1;
      this.modalRef = this.modalService.open(arg2, { centered: true });
    } else {
      // 处理第二个重载的情况
      this.modalService.open(arg1, { centered: true });
    }
  }
  get filteredRecords() {
    return this.searchText
      ? this.recordList.filter(record => record.trackName.toLowerCase().includes(this.searchText.toLowerCase()))
      : this.recordList;
  }

  protected readonly faSquarePlus = faSquarePlus;
}
