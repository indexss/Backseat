import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FollowFormService, FollowFormGroup } from './follow-form.service';
import { IFollow } from '../follow.model';
import { FollowService } from '../service/follow.service';

@Component({
  selector: 'jhi-follow-update',
  templateUrl: './follow-update.component.html',
})
export class FollowUpdateComponent implements OnInit {
  isSaving = false;
  follow: IFollow | null = null;

  editForm: FollowFormGroup = this.followFormService.createFollowFormGroup();

  constructor(
    protected followService: FollowService,
    protected followFormService: FollowFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ follow }) => {
      this.follow = follow;
      if (follow) {
        this.updateForm(follow);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const follow = this.followFormService.getFollow(this.editForm);
    if (follow.id !== null) {
      this.subscribeToSaveResponse(this.followService.update(follow));
    } else {
      this.subscribeToSaveResponse(this.followService.create(follow));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollow>>): void {
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

  protected updateForm(follow: IFollow): void {
    this.follow = follow;
    this.followFormService.resetForm(this.editForm, follow);
  }
}
