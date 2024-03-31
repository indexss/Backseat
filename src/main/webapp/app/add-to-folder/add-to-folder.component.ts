import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FetchTrackLeaderboardService } from '../leaderboard/fetch-track-leaderboard.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddToFolderService } from './add-to-folder.service';
import { AccountService } from '../core/auth/account.service';
import { Account } from '../core/auth/account.model';
import { Router } from '@angular/router';

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
  account!: Account;
  showAlert: boolean = false;
  showModalFlag: boolean = false;
  constructor(
    private fetchTrackLeaderboardService: FetchTrackLeaderboardService,
    private modalService: NgbModal,
    private addToFolderService: AddToFolderService,
    private accountService: AccountService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTrackLeaderboardService.getTrackLeaderboard().subscribe(data => {
      this.recordList = data.data.leaderboard;
    });

    this.addToFolderService.getUserFolder().subscribe(data => {
      this.folderList = data.data.folder;
    });
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
          this.addToFolderService.addFolder(this.folderName).subscribe(data => {});
          this.modalService.dismissAll();
          this.folderName = '';
          setTimeout(() => {
            this.folderList = [];
            this.addToFolderService.getUserFolder().subscribe(data => {
              this.folderList = data.data.folder;
              this.changeDetectorRef.detectChanges();
            });
          }, 300);
        }
      } else {
        this.modalService.dismissAll();
        this.router.navigate(['/login']);
      }
    });
  }

  deleteFolder(folderId: number) {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.addToFolderService.deleteFolder(folderId).subscribe(data => {});
        setTimeout(() => {
          this.folderList = [];
          this.addToFolderService.getUserFolder().subscribe(data => {
            this.folderList = data.data.folder;
            this.changeDetectorRef.detectChanges();
          });
        }, 300);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
