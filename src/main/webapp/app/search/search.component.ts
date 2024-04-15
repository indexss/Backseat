import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { FetchTrackService } from './fetch-track.service';
import { Account } from 'app/core/auth/account.model';
import { DeviceService } from 'app/mobile/device.service';
import { NgbCollapseModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faFilter, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../core/auth/account.service';
import { AddToFolderService } from '../add-to-folder/add-to-folder.service';
import { Router } from '@angular/router';

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
interface Folder {
  id: number;
  folderId: number;
  folderName: string;
  imageURL: string;
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
  filteredRecordList: Record[] = [];
  selectedSpotifyURI!: string;
  selectedTrack: Record | null = null;
  showSuggestions = false;
  folderList: Folder[] = [];

  constructor(
    private fetchTrackService: FetchTrackService,
    private modalService: NgbModal,
    private router: Router,
    private addToFolderService: AddToFolderService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.addToFolderService.getUserFolder().subscribe(data => {
      this.folderList = data.data.folder;
    });

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

  addToFolder(folderId: number) {
    console.log(`Adding trackURI: ${this.spotifyURI} to folderId: ${folderId}`);
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.addToFolderService.addEntryFolder(this.spotifyURI, folderId).subscribe(data => {});
      }
    });
    this.modalRef.close();
  }

  getSpotifyLink(spotifyURI: string): string {
    let spotifyLink: string = '';
    if (spotifyURI.startsWith('spotify:track:')) {
      spotifyLink = spotifyURI.replace('spotify:track:', 'https://open.spotify.com/track/');
    } else if (spotifyURI.startsWith('spotify:album:')) {
      spotifyLink = spotifyURI.replace('spotify:album:', 'https://open.spotify.com/album/');
    } else {
      console.error('Unsupported SpotifyURI: ', spotifyURI);
    }
    return spotifyLink;
  }

  //click anywhere else, search result disappear
  onSearchInput(focused: boolean): void {
    this.showSuggestions = focused || this.searchText.length > 0;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event): void {
    // Check if the click is outside the search-hero element
    if (!document.querySelector('.search-hero')!.contains(event.target as Node)) {
      this.showSuggestions = false; // Hide the autocomplete suggestions
    }
  }

  redirectToAlbum(spotifyURI: string): void {
    // 导航到 /rating/{spotifyURI}
    this.router.navigate(['/rating', spotifyURI]);
  }

  redirectToTrack(spotifyURI: string): void {
    // 导航到 /rating/{spotifyURI}
    this.router.navigate(['/rating', spotifyURI]);
  }
  //filter any track contain some string
  get filteredRecords() {
    return this.searchText
      ? this.recordList.filter(record => record.trackName.toLowerCase().includes(this.searchText.toLowerCase()))
      : this.recordList;
  }
  onRecordSelected(recordURI: string): void {
    const selected = this.filteredRecordList.find(record => record.trackURI === recordURI);

    // Handle the situation where the record is not found
    if (selected) {
      this.selectedTrack = selected;
    } else {
      // If the record is not found, you might want to clear the selected track or handle it appropriately
      this.selectedTrack = null; // or however you wish to handle this case
    }
  }

  protected readonly faSquarePlus = faSquarePlus;
}
