import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpotifyConnectionFormService, SpotifyConnectionFormGroup } from './spotify-connection-form.service';
import { ISpotifyConnection } from '../spotify-connection.model';
import { SpotifyConnectionService } from '../service/spotify-connection.service';

@Component({
  selector: 'jhi-spotify-connection-update',
  templateUrl: './spotify-connection-update.component.html',
})
export class SpotifyConnectionUpdateComponent implements OnInit {
  isSaving = false;
  spotifyConnection: ISpotifyConnection | null = null;

  editForm: SpotifyConnectionFormGroup = this.spotifyConnectionFormService.createSpotifyConnectionFormGroup();

  constructor(
    protected spotifyConnectionService: SpotifyConnectionService,
    protected spotifyConnectionFormService: SpotifyConnectionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ spotifyConnection }) => {
      this.spotifyConnection = spotifyConnection;
      if (spotifyConnection) {
        this.updateForm(spotifyConnection);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const spotifyConnection = this.spotifyConnectionFormService.getSpotifyConnection(this.editForm);
    if (spotifyConnection.spotifyURI !== null) {
      this.subscribeToSaveResponse(this.spotifyConnectionService.update(spotifyConnection));
    } else {
      this.subscribeToSaveResponse(this.spotifyConnectionService.create(spotifyConnection));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpotifyConnection>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(spotifyConnection: ISpotifyConnection): void {
    this.spotifyConnection = spotifyConnection;
    this.spotifyConnectionFormService.resetForm(this.editForm, spotifyConnection);
  }
}
