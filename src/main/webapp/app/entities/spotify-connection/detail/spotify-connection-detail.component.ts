import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpotifyConnection } from '../spotify-connection.model';

@Component({
  selector: 'jhi-spotify-connection-detail',
  templateUrl: './spotify-connection-detail.component.html',
})
export class SpotifyConnectionDetailComponent implements OnInit {
  spotifyConnection: ISpotifyConnection | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spotifyConnection }) => {
      this.spotifyConnection = spotifyConnection;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
