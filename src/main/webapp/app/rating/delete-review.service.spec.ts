import { TestBed } from '@angular/core/testing';

import { DeleteReviewService } from './delete-review.service';

describe('DeleteReviewService', () => {
  let service: DeleteReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
