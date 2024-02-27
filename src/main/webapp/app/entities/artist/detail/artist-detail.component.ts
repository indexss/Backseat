import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArtist } from '../artist.model';

@Component({
  selector: 'jhi-artist-detail',
  templateUrl: './artist-detail.component.html',
})
export class ArtistDetailComponent implements OnInit {
  artist: IArtist | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ artist }) => {
      this.artist = artist;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
