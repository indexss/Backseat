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
  folderName: string;
  imgURL: string;
}

@Component({
  selector: 'jhi-add-to-folder',
  templateUrl: './add-to-folder.component.html',
  styleUrls: ['./add-to-folder.component.scss'],
})
export class AddToFolderComponent implements OnInit {
  recordList: Record[] = [];
  folderList: Folder[] = [];
  recordId!: number;
  folderDisplay: any[] = [
    { id: 1, name: 'Playlist 1' },
    { id: 2, name: 'Playlist 2' },
    { id: 3, name: 'Playlist 3' },
  ];
  modalRef!: NgbModalRef;
  folderName!: string;
  imageURL: string = 'https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg';
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
  }

  // 打开模态框
  openModal(recordId: number, content: TemplateRef<any>) {
    this.recordId = recordId; // 记录当前点击的歌曲 ID
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  // 将歌曲添加到指定的播放列表中
  addToFolder(folderId: number) {
    console.log(`Adding song with ID ${this.recordId} to playlist with ID ${folderId}`);
    this.modalRef.close();
  }

  addFolder() {
    this.accountService.identity().subscribe(account => {
      if (account) {
        // this.submitReview();
        if (this.folderName === undefined || this.folderName === '' || this.folderName === null || this.folderName.trim().length === 0) {
          this.showAlert = true;
          return;
        } else {
          this.showAlert = false;
          this.addToFolderService.addFolder(this.folderName, this.imageURL).subscribe(data => {});
        }
      }
    });
  }
}
