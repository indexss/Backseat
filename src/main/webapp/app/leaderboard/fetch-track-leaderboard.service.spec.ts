import { TestBed } from '@angular/core/testing';

import { FetchTrackLeaderboardService } from './fetch-track-leaderboard.service';

describe('FetchTrackLeaderboardService', () => {
  let service: FetchTrackLeaderboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchTrackLeaderboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
