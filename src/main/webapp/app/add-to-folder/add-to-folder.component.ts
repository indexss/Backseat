import { Component, OnInit, TemplateRef } from '@angular/core';
import { FetchTrackLeaderboardService } from '../leaderboard/fetch-track-leaderboard.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddToFolderService } from './add-to-folder.service';
import { AccountService } from '../core/auth/account.service';
import { Account } from '../core/auth/account.model';

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

interface Folder {
  id: number;
  folderId: number;
  folderName: string;
  imageURL: string;
}

@Component({
  selector: 'jhi-add-to-folder',
  templateUrl: './add-to-folder.component.html',
  styleUrls: ['./add-to-folder.component.scss'],
})
export class AddToFolderComponent implements OnInit {
  recordList: Record[] = [];
  folderList: Folder[] = [];
  spotifyURI!: string;
  modalRef!: NgbModalRef;
  folderName!: string;
  imageURL: string = 'https://i.scdn.co/image/ab67616d00001e02904445d70d04eb24d6bb79ac';
  account!: Account;
  showAlert: boolean = false;
  constructor(
    private fetchTrackLeaderboardService: FetchTrackLeaderboardService,
    private modalService: NgbModal,
    private addToFolderService: AddToFolderService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.fetchTrackLeaderboardService.getTrackLeaderboard().subscribe(data => {
      this.recordList = data.data.leaderboard;
    });

    this.addToFolderService.getUserFolder().subscribe(data => {
      this.folderList = data.data.folder;
    });
  }

  openModal(spotifyURI: string, content: TemplateRef<any>) {
    this.spotifyURI = spotifyURI;
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  addToFolder(folderId: number) {
    console.log(`Adding song with ID ${this.spotifyURI} to playlist with ID ${folderId}`);
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.addToFolderService.addEntryFolder(this.spotifyURI, folderId).subscribe(data => {});
      }
    });
    this.modalRef.close();
  }

  addFolder() {
    this.accountService.identity().subscribe(account => {
      if (account) {
        if (this.folderName === undefined || this.folderName === '' || this.folderName === null || this.folderName.trim().length === 0) {
          this.showAlert = true;
          return;
        } else {
          this.showAlert = false;
          this.addToFolderService.addFolder(this.folderName, this.imageURL).subscribe(data => {});
          this.folderName = '';
        }
      }
    });
  }
}
