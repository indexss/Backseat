import { TestBed } from '@angular/core/testing';

import { FetchTrackService } from './fetch-track.service';

describe('FetchTrackLeaderboardService', () => {
  let service: FetchTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
