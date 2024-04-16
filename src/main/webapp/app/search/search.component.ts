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
interface Album {
  id: number;
  albumName: string;
  reviews: number;
  rating: number;
  artist: string;
  albumURI: string;
  imgURL: string;
}
interface Folder {
  id: number;
  folderId: number;
  userId: number;
  folderName: string;
  imgURL: string;
  username: string;
}

interface Profile {
  id: number;
  username: string;
  spotifyURI: string;
  imgURL: string;
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
  //folderList for adding track or album
  folderList: Folder[] = [];
  albumList: Album[] = [];
  profileList: Profile[] = [];
  //folderList for find all folder list
  folderAllList: Folder[] = [];
  testImageURL: string = '../../content/images/jhipster_family_member_0_head-192.png';
  testFolderImageURL: string = '../../content/images/HMAC.png';
  //shows only the top 10 of filtered result;
  //why I am writing this: Because the html can not load so much data, which will result lots of image unable to load
  ShowRecordList: Record[] = [];
  ShowAlbumList: Album[] = [];
  ShowProfileList: Profile[] = [];
  ShowFolderList: Folder[] = [];
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
        // I am so sorry here : data.data.leaderboard means recordList from Search Controller
        // Time is not enough  I do not want to change in case of emerging any bug
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
        this.ShowRecordList = this.recordList.slice(0, 10);
        const newAlbumData: Album[] = data.data.album.map((item: any) => ({
          id: item.id,
          albumName: item.trackName,
          reviews: item.reviews,
          rating: item.rating,
          artist: item.artist,
          albumURI: item.trackURI,
          imgURL: item.imgURL,
          newItem: true, // Assuming you want to set newItem to true for the animation
        }));
        this.albumList = newAlbumData;
        this.ShowAlbumList = this.albumList.slice(0, 10);
        console.log('data.data.album', data.data.album);
        console.log('albumList', this.albumList);
      },
      error => {
        // Handle any errors here
        console.error('There was an error fetching the tracks', error);
      }
    );
    this.fetchTrackService.getfolderProfile().subscribe(
      data => {
        const newProfileData: Profile[] = data.data.profiles.map((item: any) => ({
          id: item.id,
          username: item.username,
          spotifyURI: item.spotifyURI,
          imgURL: item.profilePhoto,
          newItem: true, // Assuming you want to set newItem to true for the animation
        }));
        this.profileList = newProfileData;
        this.ShowProfileList = this.ShowProfileList.slice(0, 10);
        const newfolderData: Folder[] = data.data.folder.map((item: any) => ({
          id: item.id,
          folderId: item.id,
          folderName: item.name,
          imgURL: item.image,
          userId: item.profile.id,
          username: this.findUserNameById(item.profile.id),
          newItem: true, // Assuming you want to set newItem to true for the animation
        }));
        this.folderAllList = newfolderData;
        this.ShowFolderList = this.folderAllList.slice(0, 10);

        console.log('profile data:', this.profileList);
        console.log('folder data:', this.folderAllList);
        console.log('data.data.folder', data.data.folder);
        console.log('data.dta.profile', data.data.profiles);
      },
      error => {
        // Handle any errors here
        console.error('There was an error fetching the tracks', error);
      }
    );
  }

  findUserNameById(userId: number): string | null {
    // 在 profileList 中查找与提供的 userId 匹配的 profile
    const profile = this.profileList.find(profile => profile.id === userId);
    // 如果找到了匹配的 profile，则返回其 username，否则返回 null
    return profile ? profile.username : null;
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

  redirectToTrack(spotifyURI: string): void {
    // 导航到 /rating/{spotifyURI}
    this.router.navigate(['/rating', spotifyURI]);
  }

  redirectToProfile(profileId: number): void {
    // 导航到 /rating/{spotifyURI}
    this.router.navigate(['/profile', profileId]);
  }

  redirecToFolder(folderId: number): void {
    this.router.navigate(['folderPage', folderId]);
  }

  //filter any track contain some string
  get filteredRecords() {
    if (this.searchText) {
      return this.recordList.filter(record => record.trackName.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      return this.recordList;
    }
  }

  get filteredAlbums() {
    if (this.searchText) {
      return this.albumList.filter(album => album.albumName.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      return this.albumList;
    }
  }

  get filteredProfiles() {
    if (this.searchText) {
      return this.profileList.filter(profile => profile.username.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      return this.profileList;
    }
  }

  get filteredFolders() {
    if (this.searchText) {
      return this.folderAllList.filter(folder => folder.folderName.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      return this.folderAllList;
    }
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
