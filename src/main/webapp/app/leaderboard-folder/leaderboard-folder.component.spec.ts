import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardFolderComponent } from './leaderboard-folder.component';

describe('LeaderboardFolderComponent', () => {
  let component: LeaderboardFolderComponent;
  let fixture: ComponentFixture<LeaderboardFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaderboardFolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
