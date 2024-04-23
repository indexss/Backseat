import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
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
  showAlertShort: boolean = false;
  showAlertLong: boolean = false;
  constructor(
    private modalService: NgbModal,
    private addToFolderService: AddToFolderService,
    private accountService: AccountService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addToFolderService.getUserFolder().subscribe(data => {
      this.folderList = data.data.folder;
    });
  }

  openModal(spotifyURI: string, content: TemplateRef<any>): void;
  openModal(content: TemplateRef<any>): void;

  openModal(a: any, b?: any): void {
    if (typeof a === 'string') {
      this.spotifyURI = a;
      this.modalRef = this.modalService.open(b, { centered: true });
    } else {
      this.modalService.open(a, { centered: true });
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

  addFolder() {
    this.accountService.identity().subscribe(account => {
      if (account) {
        if (!this.folderName || this.folderName.trim().length === 0) {
          this.showAlertShort = true;
          return;
        } else if (this.folderName.trim().length > 18) {
          this.showAlertLong = true;
          return;
        } else {
          this.showAlertShort = false;
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

  editFolder(folderId: number) {
    this.router.navigate(['/folder', folderId, 'edit']);
  }
}
