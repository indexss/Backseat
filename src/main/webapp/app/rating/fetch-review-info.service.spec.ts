import { TestBed } from '@angular/core/testing';

import { FetchReviewInfoService } from './fetch-review-info.service';

describe('FetchReviewInfoService', () => {
  let service: FetchReviewInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchReviewInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
