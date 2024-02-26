import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { WantToListenListEntryFormService, WantToListenListEntryFormGroup } from './want-to-listen-list-entry-form.service';
import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';
import { WantToListenListEntryService } from '../service/want-to-listen-list-entry.service';

@Component({
  selector: 'jhi-want-to-listen-list-entry-update',
  templateUrl: './want-to-listen-list-entry-update.component.html',
})
export class WantToListenListEntryUpdateComponent implements OnInit {
  isSaving = false;
  wantToListenListEntry: IWantToListenListEntry | null = null;

  editForm: WantToListenListEntryFormGroup = this.wantToListenListEntryFormService.createWantToListenListEntryFormGroup();

  constructor(
    protected wantToListenListEntryService: WantToListenListEntryService,
    protected wantToListenListEntryFormService: WantToListenListEntryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wantToListenListEntry }) => {
      this.wantToListenListEntry = wantToListenListEntry;
      if (wantToListenListEntry) {
        this.updateForm(wantToListenListEntry);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wantToListenListEntry = this.wantToListenListEntryFormService.getWantToListenListEntry(this.editForm);
    if (wantToListenListEntry.id !== null) {
      this.subscribeToSaveResponse(this.wantToListenListEntryService.update(wantToListenListEntry));
    } else {
      this.subscribeToSaveResponse(this.wantToListenListEntryService.create(wantToListenListEntry));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWantToListenListEntry>>): void {
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

  protected updateForm(wantToListenListEntry: IWantToListenListEntry): void {
    this.wantToListenListEntry = wantToListenListEntry;
    this.wantToListenListEntryFormService.resetForm(this.editForm, wantToListenListEntry);
  }
}
