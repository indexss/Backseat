import { TestBed } from '@angular/core/testing';

import { AddReviewService } from './add-review.service';

describe('AddReviewService', () => {
  let service: AddReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
