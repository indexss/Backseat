import { Component, OnInit, ViewChild } from '@angular/core';
import { FolderService } from './folder.service';
import { ActivatedRoute, Router } from '@angular/router';

interface EntryInfo {
  entryName: string;
  imageURL: string;
  artist: string;
}

interface FolderEntry {
  spotifyURI: string;
  addTime: string;
}
@Component({
  selector: 'jhi-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  page = 1;
  pageSize = 10;
  imageURL!: string;
  folderName: string = '';
  id!: any;
  folderEntryList: FolderEntry[] = [];
  entryInfoList: EntryInfo[] = [];

  constructor(private route: ActivatedRoute, private folderService: FolderService) {}

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
          };
          this.folderEntryList.push(folderEntry);
        }
      });
    });
  }

  // nameChange() {
  //   const newName = prompt('Enter the new name below (max 18 characters):', this.folderName);
  //   if (newName !== null) {
  //     this.folderName = newName.substring(0, 18);
  //   }
  // }
  getSpotifyLink(spotifyURI: string): string {
    let spotifyLink: string = '';
    if (spotifyURI.startsWith('spotify:track:')) {
      spotifyLink = spotifyURI.replace('spotify:track:', 'https://open.spotify.com/track/');
    } else if (spotifyURI.startsWith('spotify:album:')) {
      spotifyLink = spotifyURI.replace('spotify:album:', 'https://open.spotify.com/album/');
    } else {
      console.error('Unsupported Spotify URI type:', spotifyURI);
    }
    return spotifyLink;
  }
}
