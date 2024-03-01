import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ReviewFormService, ReviewFormGroup } from './review-form.service';
import { IReview } from '../review.model';
import { ReviewService } from '../service/review.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IProfile } from 'app/entities/profile/profile.model';
import { ProfileService } from 'app/entities/profile/service/profile.service';
import { ITrack } from 'app/entities/track/track.model';
import { TrackService } from 'app/entities/track/service/track.service';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

@Component({
  selector: 'jhi-review-update',
  templateUrl: './review-update.component.html',
})
export class ReviewUpdateComponent implements OnInit {
  isSaving = false;
  review: IReview | null = null;

  profilesSharedCollection: IProfile[] = [];
  tracksSharedCollection: ITrack[] = [];
  albumsSharedCollection: IAlbum[] = [];

  editForm: ReviewFormGroup = this.reviewFormService.createReviewFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected reviewService: ReviewService,
    protected reviewFormService: ReviewFormService,
    protected profileService: ProfileService,
    protected trackService: TrackService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProfile = (o1: IProfile | null, o2: IProfile | null): boolean => this.profileService.compareProfile(o1, o2);

  compareTrack = (o1: ITrack | null, o2: ITrack | null): boolean => this.trackService.compareTrack(o1, o2);

  compareAlbum = (o1: IAlbum | null, o2: IAlbum | null): boolean => this.albumService.compareAlbum(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ review }) => {
      this.review = review;
      if (review) {
        this.updateForm(review);
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const review = this.reviewFormService.getReview(this.editForm);
    if (review.id !== null) {
      this.subscribeToSaveResponse(this.reviewService.update(review));
    } else {
      this.subscribeToSaveResponse(this.reviewService.create(review));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReview>>): void {
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

  protected updateForm(review: IReview): void {
    this.review = review;
    this.reviewFormService.resetForm(this.editForm, review);

    this.profilesSharedCollection = this.profileService.addProfileToCollectionIfMissing<IProfile>(
      this.profilesSharedCollection,
      review.profile
    );
    this.tracksSharedCollection = this.trackService.addTrackToCollectionIfMissing<ITrack>(this.tracksSharedCollection, review.track);
    this.albumsSharedCollection = this.albumService.addAlbumToCollectionIfMissing<IAlbum>(this.albumsSharedCollection, review.album);
  }

  protected loadRelationshipsOptions(): void {
    this.profileService
      .query()
      .pipe(map((res: HttpResponse<IProfile[]>) => res.body ?? []))
      .pipe(map((profiles: IProfile[]) => this.profileService.addProfileToCollectionIfMissing<IProfile>(profiles, this.review?.profile)))
      .subscribe((profiles: IProfile[]) => (this.profilesSharedCollection = profiles));

    this.trackService
      .query()
      .pipe(map((res: HttpResponse<ITrack[]>) => res.body ?? []))
      .pipe(map((tracks: ITrack[]) => this.trackService.addTrackToCollectionIfMissing<ITrack>(tracks, this.review?.track)))
      .subscribe((tracks: ITrack[]) => (this.tracksSharedCollection = tracks));

    this.albumService
      .query()
      .pipe(map((res: HttpResponse<IAlbum[]>) => res.body ?? []))
      .pipe(map((albums: IAlbum[]) => this.albumService.addAlbumToCollectionIfMissing<IAlbum>(albums, this.review?.album)))
      .subscribe((albums: IAlbum[]) => (this.albumsSharedCollection = albums));
  }
}
