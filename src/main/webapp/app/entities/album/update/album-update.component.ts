import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AlbumFormService, AlbumFormGroup } from './album-form.service';
import { IAlbum } from '../album.model';
import { AlbumService } from '../service/album.service';
import { IArtist } from 'app/entities/artist/artist.model';
import { ArtistService } from 'app/entities/artist/service/artist.service';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { FolderEntryService } from 'app/entities/folder-entry/service/folder-entry.service';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { WantToListenListEntryService } from 'app/entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html',
})
export class AlbumUpdateComponent implements OnInit {
  isSaving = false;
  album: IAlbum | null = null;

  artistsSharedCollection: IArtist[] = [];
  folderEntriesSharedCollection: IFolderEntry[] = [];
  wantToListenListEntriesSharedCollection: IWantToListenListEntry[] = [];

  editForm: AlbumFormGroup = this.albumFormService.createAlbumFormGroup();

  constructor(
    protected albumService: AlbumService,
    protected albumFormService: AlbumFormService,
    protected artistService: ArtistService,
    protected folderEntryService: FolderEntryService,
    protected wantToListenListEntryService: WantToListenListEntryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareArtist = (o1: IArtist | null, o2: IArtist | null): boolean => this.artistService.compareArtist(o1, o2);

  compareFolderEntry = (o1: IFolderEntry | null, o2: IFolderEntry | null): boolean => this.folderEntryService.compareFolderEntry(o1, o2);

  compareWantToListenListEntry = (o1: IWantToListenListEntry | null, o2: IWantToListenListEntry | null): boolean =>
    this.wantToListenListEntryService.compareWantToListenListEntry(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.album = album;
      if (album) {
        this.updateForm(album);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.albumFormService.getAlbum(this.editForm);
    if (album.spotifyURI !== null) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>): void {
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

  protected updateForm(album: IAlbum): void {
    this.album = album;
    this.albumFormService.resetForm(this.editForm, album);

    this.artistsSharedCollection = this.artistService.addArtistToCollectionIfMissing<IArtist>(
      this.artistsSharedCollection,
      ...(album.artists ?? [])
    );
    this.folderEntriesSharedCollection = this.folderEntryService.addFolderEntryToCollectionIfMissing<IFolderEntry>(
      this.folderEntriesSharedCollection,
      ...(album.folderEntries ?? [])
    );
    this.wantToListenListEntriesSharedCollection =
      this.wantToListenListEntryService.addWantToListenListEntryToCollectionIfMissing<IWantToListenListEntry>(
        this.wantToListenListEntriesSharedCollection,
        ...(album.wantToListenListEntries ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.artistService
      .query()
      .pipe(map((res: HttpResponse<IArtist[]>) => res.body ?? []))
      .pipe(
        map((artists: IArtist[]) => this.artistService.addArtistToCollectionIfMissing<IArtist>(artists, ...(this.album?.artists ?? [])))
      )
      .subscribe((artists: IArtist[]) => (this.artistsSharedCollection = artists));

    this.folderEntryService
      .query()
      .pipe(map((res: HttpResponse<IFolderEntry[]>) => res.body ?? []))
      .pipe(
        map((folderEntries: IFolderEntry[]) =>
          this.folderEntryService.addFolderEntryToCollectionIfMissing<IFolderEntry>(folderEntries, ...(this.album?.folderEntries ?? []))
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
            ...(this.album?.wantToListenListEntries ?? [])
          )
        )
      )
      .subscribe(
        (wantToListenListEntries: IWantToListenListEntry[]) => (this.wantToListenListEntriesSharedCollection = wantToListenListEntries)
      );
  }
}
