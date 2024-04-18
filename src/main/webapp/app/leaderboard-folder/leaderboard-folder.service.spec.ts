import { TestBed } from '@angular/core/testing';

import { LeaderboardFolderService } from './leaderboard-folder.service';

describe('LeaderboardFolderService', () => {
  let service: LeaderboardFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderboardFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
