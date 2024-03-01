import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FolderFormService, FolderFormGroup } from './folder-form.service';
import { IFolder } from '../folder.model';
import { FolderService } from '../service/folder.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IProfile } from 'app/entities/profile/profile.model';
import { ProfileService } from 'app/entities/profile/service/profile.service';

@Component({
  selector: 'jhi-folder-update',
  templateUrl: './folder-update.component.html',
})
export class FolderUpdateComponent implements OnInit {
  isSaving = false;
  folder: IFolder | null = null;

  profilesSharedCollection: IProfile[] = [];

  editForm: FolderFormGroup = this.folderFormService.createFolderFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected folderService: FolderService,
    protected folderFormService: FolderFormService,
    protected profileService: ProfileService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProfile = (o1: IProfile | null, o2: IProfile | null): boolean => this.profileService.compareProfile(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ folder }) => {
      this.folder = folder;
      if (folder) {
        this.updateForm(folder);
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
    const folder = this.folderFormService.getFolder(this.editForm);
    if (folder.id !== null) {
      this.subscribeToSaveResponse(this.folderService.update(folder));
    } else {
      this.subscribeToSaveResponse(this.folderService.create(folder));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFolder>>): void {
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

  protected updateForm(folder: IFolder): void {
    this.folder = folder;
    this.folderFormService.resetForm(this.editForm, folder);

    this.profilesSharedCollection = this.profileService.addProfileToCollectionIfMissing<IProfile>(
      this.profilesSharedCollection,
      folder.profile
    );
  }

  protected loadRelationshipsOptions(): void {
    this.profileService
      .query()
      .pipe(map((res: HttpResponse<IProfile[]>) => res.body ?? []))
      .pipe(map((profiles: IProfile[]) => this.profileService.addProfileToCollectionIfMissing<IProfile>(profiles, this.folder?.profile)))
      .subscribe((profiles: IProfile[]) => (this.profilesSharedCollection = profiles));
  }
}
