import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FolderEntryFormService, FolderEntryFormGroup } from './folder-entry-form.service';
import { IFolderEntry } from '../folder-entry.model';
import { FolderEntryService } from '../service/folder-entry.service';
import { IFolder } from 'app/entities/folder/folder.model';
import { FolderService } from 'app/entities/folder/service/folder.service';

@Component({
  selector: 'jhi-folder-entry-update',
  templateUrl: './folder-entry-update.component.html',
})
export class FolderEntryUpdateComponent implements OnInit {
  isSaving = false;
  folderEntry: IFolderEntry | null = null;

  foldersSharedCollection: IFolder[] = [];

  editForm: FolderEntryFormGroup = this.folderEntryFormService.createFolderEntryFormGroup();

  constructor(
    protected folderEntryService: FolderEntryService,
    protected folderEntryFormService: FolderEntryFormService,
    protected folderService: FolderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareFolder = (o1: IFolder | null, o2: IFolder | null): boolean => this.folderService.compareFolder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ folderEntry }) => {
      this.folderEntry = folderEntry;
      if (folderEntry) {
        this.updateForm(folderEntry);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const folderEntry = this.folderEntryFormService.getFolderEntry(this.editForm);
    if (folderEntry.id !== null) {
      this.subscribeToSaveResponse(this.folderEntryService.update(folderEntry));
    } else {
      this.subscribeToSaveResponse(this.folderEntryService.create(folderEntry));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFolderEntry>>): void {
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

  protected updateForm(folderEntry: IFolderEntry): void {
    this.folderEntry = folderEntry;
    this.folderEntryFormService.resetForm(this.editForm, folderEntry);

    this.foldersSharedCollection = this.folderService.addFolderToCollectionIfMissing<IFolder>(
      this.foldersSharedCollection,
      folderEntry.folder
    );
  }

  protected loadRelationshipsOptions(): void {
    this.folderService
      .query()
      .pipe(map((res: HttpResponse<IFolder[]>) => res.body ?? []))
      .pipe(map((folders: IFolder[]) => this.folderService.addFolderToCollectionIfMissing<IFolder>(folders, this.folderEntry?.folder)))
      .subscribe((folders: IFolder[]) => (this.foldersSharedCollection = folders));
  }
}
