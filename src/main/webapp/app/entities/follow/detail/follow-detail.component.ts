import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFollow } from '../follow.model';

@Component({
  selector: 'jhi-follow-detail',
  templateUrl: './follow-detail.component.html',
})
export class FollowDetailComponent implements OnInit {
  follow: IFollow | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ follow }) => {
      this.follow = follow;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
