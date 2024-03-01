import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReview } from '../review.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-review-detail',
  templateUrl: './review-detail.component.html',
})
export class ReviewDetailComponent implements OnInit {
  review: IReview | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ review }) => {
      this.review = review;
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
