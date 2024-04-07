import { TestBed } from '@angular/core/testing';

import { AlbumReviewService } from './album-review.service';

describe('AlbumReviewService', () => {
  let service: AlbumReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
