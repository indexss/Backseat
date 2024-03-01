import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISetting } from '../setting.model';

@Component({
  selector: 'jhi-setting-detail',
  templateUrl: './setting-detail.component.html',
})
export class SettingDetailComponent implements OnInit {
  setting: ISetting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ setting }) => {
      this.setting = setting;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
