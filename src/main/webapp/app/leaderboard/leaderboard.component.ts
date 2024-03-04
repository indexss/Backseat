import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Record {
  id: number;
  trackName: string;
  album: string;
  reviews: number;
  rating: number;
  artist: string;
  trackURI: string;
}

@Component({
  selector: 'jhi-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  page = 1;
  pageSize = 10;
  trackURI = 'asd';
  trackLink = '/rating/'.concat(this.trackURI);
  recordList: Record[] = [
    {
      id: 1,
      trackName: 'The Beatles',
      album: 'Abbey Road',
      reviews: 100,
      rating: 5,
      artist: 'The Beatles',
      trackURI: 'qwe',
    },
    {
      id: 2,
      trackName: 'The Beatles',
      album: 'Abbey Road',
      reviews: 100,
      rating: 5,
      artist: 'The Beatles',
      trackURI: 'qwe',
    },
    {
      id: 3,
      trackName: 'The Beatles',
      album: 'Abbey Road',
      reviews: 100,
      rating: 5,
      artist: 'The Beatles',
      trackURI: 'qwe',
    },
    {
      id: 4,
      trackName: 'The Beatles',
      album: 'Abbey Road',
      reviews: 100,
      rating: 5,
      artist: 'The Beatles',
      trackURI: 'qwe',
    },
    {
      id: 5,
      trackName: 'The Beatles',
      album: 'Abbey Road',
      reviews: 100,
      rating: 5,
      artist: 'The Beatles',
      trackURI: 'qwe',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
