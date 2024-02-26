import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SettingFormService, SettingFormGroup } from './setting-form.service';
import { ISetting } from '../setting.model';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'jhi-setting-update',
  templateUrl: './setting-update.component.html',
})
export class SettingUpdateComponent implements OnInit {
  isSaving = false;
  setting: ISetting | null = null;

  editForm: SettingFormGroup = this.settingFormService.createSettingFormGroup();

  constructor(
    protected settingService: SettingService,
    protected settingFormService: SettingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ setting }) => {
      this.setting = setting;
      if (setting) {
        this.updateForm(setting);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const setting = this.settingFormService.getSetting(this.editForm);
    if (setting.id !== null) {
      this.subscribeToSaveResponse(this.settingService.update(setting));
    } else {
      this.subscribeToSaveResponse(this.settingService.create(setting));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISetting>>): void {
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

  protected updateForm(setting: ISetting): void {
    this.setting = setting;
    this.settingFormService.resetForm(this.editForm, setting);
  }
}
