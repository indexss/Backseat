import { Component, OnInit, ViewChild } from '@angular/core';
import { FolderService } from './folder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../core/auth/account.service';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface EntryInfo {
  entryName: string;
  imageURL: string;
  artist: string;
}

interface FolderEntry {
  spotifyURI: string;
  addTime: string;
  hovered: boolean;
}
@Component({
  selector: 'jhi-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  faTrash = faTrash;
  faPlayCircle = faPlayCircle;
  page = 1;
  pageSize = 10;
  imageURL!: string;
  folderName: string = '';
  id!: any;
  folderEntryList: FolderEntry[] = [];
  entryInfoList: EntryInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private folderService: FolderService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.folderService.getFolderEntry(this.id).subscribe(data => {
        this.folderName = data.data.folderEntry.folderName;
        this.imageURL = data.data.folderEntry.imageURL;
        this.entryInfoList = data.data.folderEntry.entryList;
        const folderEntryDTO = data.data.folderEntry.folderEntries;
        for (let i = 0; i < folderEntryDTO.length; i++) {
          const folderEntry: FolderEntry = {
            spotifyURI: folderEntryDTO[i].spotifyURI,
            addTime: folderEntryDTO[i].addTime,
            hovered: false,
          };
          this.folderEntryList.push(folderEntry);
        }
      });
    });
  }

  getSpotifyURL(spotifyURI: string): string {
    let spotifyURL: string = '';
    if (spotifyURI.startsWith('spotify:track:')) {
      spotifyURL = spotifyURI.replace('spotify:track:', 'https://open.spotify.com/track/');
    } else if (spotifyURI.startsWith('spotify:album:')) {
      spotifyURL = spotifyURI.replace('spotify:album:', 'https://open.spotify.com/album/');
    } else {
      console.error('Unsupported SpotifyURI: ', spotifyURI);
    }
    return spotifyURL;
  }

  isAlbum(spotifyURI: string): boolean {
    if (spotifyURI.startsWith('spotify:track:')) {
      return false;
    } else {
      return true;
    }
  }

  deleteFolderEntry(spotifyURI: string) {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.folderService.deleteFolderEntry(spotifyURI, this.id).subscribe(data => {});
        setTimeout(() => {
          this.folderEntryList = [];
          this.folderService.getFolderEntry(this.id).subscribe(data => {
            this.folderName = data.data.folderEntry.folderName;
            this.imageURL = data.data.folderEntry.imageURL;
            this.entryInfoList = data.data.folderEntry.entryList;
            const folderEntryDTO = data.data.folderEntry.folderEntries;
            for (let i = 0; i < folderEntryDTO.length; i++) {
              const folderEntry: FolderEntry = {
                spotifyURI: folderEntryDTO[i].spotifyURI,
                addTime: folderEntryDTO[i].addTime,
                hovered: false,
              };
              this.folderEntryList.push(folderEntry);
            }
          });
        }, 300);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
