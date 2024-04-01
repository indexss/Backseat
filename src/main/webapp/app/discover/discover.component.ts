import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs/esm';
import { GetMusicService } from './getMusicService';

interface Record {
  id: number;
  trackName: string;
  album: string;
  rating: number;
  artist: string;
  trackURI: string;
  imgURL: string;
}

interface Review {
  id: number;
  date: dayjs.Dayjs;
}
@Component({
  selector: 'jhi-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})

//need to implement getting a record based on date in Review
export class DiscoverComponent implements OnInit {
  trackURI = 'erg';
  trackLink = '/rating/'.concat(this.trackURI);
  recordList: Record[] = [];
  constructor(private getMusicService: GetMusicService) {}

  ngOnInit(): void {
    this.getMusicService.getRecord().subscribe(data => {
      console.log('data: ');
      console.log(data);
      // this.recordList = data;
      // console.log('recordList: ');
      // console.log(this.recordList);
      this.recordList = data.data.discover;
    });
  }
}
