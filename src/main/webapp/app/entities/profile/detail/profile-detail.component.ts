import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfile } from '../profile.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-profile-detail',
  templateUrl: './profile-detail.component.html',
})
export class ProfileDetailComponent implements OnInit {
  profile: IProfile | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profile }) => {
      this.profile = profile;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
