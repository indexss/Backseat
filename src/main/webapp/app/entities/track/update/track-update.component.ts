import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TrackFormService, TrackFormGroup } from './track-form.service';
import { ITrack } from '../track.model';
import { TrackService } from '../service/track.service';
import { IArtist } from 'app/entities/artist/artist.model';
import { ArtistService } from 'app/entities/artist/service/artist.service';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { FolderEntryService } from 'app/entities/folder-entry/service/folder-entry.service';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { WantToListenListEntryService } from 'app/entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

@Component({
  selector: 'jhi-track-update',
  templateUrl: './track-update.component.html',
})
export class TrackUpdateComponent implements OnInit {
  isSaving = false;
  track: ITrack | null = null;

  artistsSharedCollection: IArtist[] = [];
  folderEntriesSharedCollection: IFolderEntry[] = [];
  wantToListenListEntriesSharedCollection: IWantToListenListEntry[] = [];
  albumsSharedCollection: IAlbum[] = [];

  editForm: TrackFormGroup = this.trackFormService.createTrackFormGroup();

  constructor(
    protected trackService: TrackService,
    protected trackFormService: TrackFormService,
    protected artistService: ArtistService,
    protected folderEntryService: FolderEntryService,
    protected wantToListenListEntryService: WantToListenListEntryService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareArtist = (o1: IArtist | null, o2: IArtist | null): boolean => this.artistService.compareArtist(o1, o2);

  compareFolderEntry = (o1: IFolderEntry | null, o2: IFolderEntry | null): boolean => this.folderEntryService.compareFolderEntry(o1, o2);

  compareWantToListenListEntry = (o1: IWantToListenListEntry | null, o2: IWantToListenListEntry | null): boolean =>
    this.wantToListenListEntryService.compareWantToListenListEntry(o1, o2);

  compareAlbum = (o1: IAlbum | null, o2: IAlbum | null): boolean => this.albumService.compareAlbum(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ track }) => {
      this.track = track;
      if (track) {
        this.updateForm(track);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const track = this.trackFormService.getTrack(this.editForm);
    if (track.spotifyURI !== null) {
      this.subscribeToSaveResponse(this.trackService.update(track));
    } else {
      this.subscribeToSaveResponse(this.trackService.create(track));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrack>>): void {
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

  protected updateForm(track: ITrack): void {
    this.track = track;
    this.trackFormService.resetForm(this.editForm, track);

    this.artistsSharedCollection = this.artistService.addArtistToCollectionIfMissing<IArtist>(
      this.artistsSharedCollection,
      ...(track.artists ?? [])
    );
    this.folderEntriesSharedCollection = this.folderEntryService.addFolderEntryToCollectionIfMissing<IFolderEntry>(
      this.folderEntriesSharedCollection,
      ...(track.folderEntries ?? [])
    );
    this.wantToListenListEntriesSharedCollection =
      this.wantToListenListEntryService.addWantToListenListEntryToCollectionIfMissing<IWantToListenListEntry>(
        this.wantToListenListEntriesSharedCollection,
        ...(track.wantToListenListEntries ?? [])
      );
    this.albumsSharedCollection = this.albumService.addAlbumToCollectionIfMissing<IAlbum>(this.albumsSharedCollection, track.album);
  }

  protected loadRelationshipsOptions(): void {
    this.artistService
      .query()
      .pipe(map((res: HttpResponse<IArtist[]>) => res.body ?? []))
      .pipe(
        map((artists: IArtist[]) => this.artistService.addArtistToCollectionIfMissing<IArtist>(artists, ...(this.track?.artists ?? [])))
      )
      .subscribe((artists: IArtist[]) => (this.artistsSharedCollection = artists));

    this.folderEntryService
      .query()
      .pipe(map((res: HttpResponse<IFolderEntry[]>) => res.body ?? []))
      .pipe(
        map((folderEntries: IFolderEntry[]) =>
          this.folderEntryService.addFolderEntryToCollectionIfMissing<IFolderEntry>(folderEntries, ...(this.track?.folderEntries ?? []))
        )
      )
      .subscribe((folderEntries: IFolderEntry[]) => (this.folderEntriesSharedCollection = folderEntries));

    this.wantToListenListEntryService
      .query()
      .pipe(map((res: HttpResponse<IWantToListenListEntry[]>) => res.body ?? []))
      .pipe(
        map((wantToListenListEntries: IWantToListenListEntry[]) =>
          this.wantToListenListEntryService.addWantToListenListEntryToCollectionIfMissing<IWantToListenListEntry>(
            wantToListenListEntries,
            ...(this.track?.wantToListenListEntries ?? [])
          )
        )
      )
      .subscribe(
        (wantToListenListEntries: IWantToListenListEntry[]) => (this.wantToListenListEntriesSharedCollection = wantToListenListEntries)
      );

    this.albumService
      .query()
      .pipe(map((res: HttpResponse<IAlbum[]>) => res.body ?? []))
      .pipe(map((albums: IAlbum[]) => this.albumService.addAlbumToCollectionIfMissing<IAlbum>(albums, this.track?.album)))
      .subscribe((albums: IAlbum[]) => (this.albumsSharedCollection = albums));
  }
}
