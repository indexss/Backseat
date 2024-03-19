import { Component, OnInit, ViewChild } from '@angular/core';
import { FolderService } from './folder.service';
import { ActivatedRoute, Router } from '@angular/router';

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

interface EntryInfo {
  entryName: string;
  imageURL: string;
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
  imageURL: string = 'https://i.scdn.co/image/ab67616d00001e02904445d70d04eb24d6bb79ac';
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

  openDialog() {
    const newName = prompt('Enter the new name below (max 18 characters):', this.folderName);
    if (newName !== null) {
      this.folderName = newName.substring(0, 18);
    }
  }
}
