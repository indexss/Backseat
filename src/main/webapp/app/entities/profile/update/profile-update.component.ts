import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProfileFormService, ProfileFormGroup } from './profile-form.service';
import { IProfile } from '../profile.model';
import { ProfileService } from '../service/profile.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ISpotifyConnection } from 'app/entities/spotify-connection/spotify-connection.model';
import { SpotifyConnectionService } from 'app/entities/spotify-connection/service/spotify-connection.service';

@Component({
  selector: 'jhi-profile-update',
  templateUrl: './profile-update.component.html',
})
export class ProfileUpdateComponent implements OnInit {
  isSaving = false;
  profile: IProfile | null = null;

  usersSharedCollection: IUser[] = [];
  spotifyConnectionsCollection: ISpotifyConnection[] = [];

  editForm: ProfileFormGroup = this.profileFormService.createProfileFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected profileService: ProfileService,
    protected profileFormService: ProfileFormService,
    protected userService: UserService,
    protected spotifyConnectionService: SpotifyConnectionService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareSpotifyConnection = (o1: ISpotifyConnection | null, o2: ISpotifyConnection | null): boolean =>
    this.spotifyConnectionService.compareSpotifyConnection(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profile }) => {
      this.profile = profile;
      if (profile) {
        this.updateForm(profile);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('teamprojectApp.error', { message: err.message })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profile = this.profileFormService.getProfile(this.editForm);
    if (profile.id !== null) {
      this.subscribeToSaveResponse(this.profileService.update(profile));
    } else {
      this.subscribeToSaveResponse(this.profileService.create(profile));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>): void {
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

  protected updateForm(profile: IProfile): void {
    this.profile = profile;
    this.profileFormService.resetForm(this.editForm, profile);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, profile.user);
    this.spotifyConnectionsCollection = this.spotifyConnectionService.addSpotifyConnectionToCollectionIfMissing<ISpotifyConnection>(
      this.spotifyConnectionsCollection,
      profile.spotifyConnection
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.profile?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.spotifyConnectionService
      .query({ filter: 'profile-is-null' })
      .pipe(map((res: HttpResponse<ISpotifyConnection[]>) => res.body ?? []))
      .pipe(
        map((spotifyConnections: ISpotifyConnection[]) =>
          this.spotifyConnectionService.addSpotifyConnectionToCollectionIfMissing<ISpotifyConnection>(
            spotifyConnections,
            this.profile?.spotifyConnection
          )
        )
      )
      .subscribe((spotifyConnections: ISpotifyConnection[]) => (this.spotifyConnectionsCollection = spotifyConnections));
  }
}
