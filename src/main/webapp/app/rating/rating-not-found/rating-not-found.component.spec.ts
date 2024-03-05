import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingNotFoundComponent } from './rating-not-found.component';

describe('RatingNotFoundComponent', () => {
  let component: RatingNotFoundComponent;
  let fixture: ComponentFixture<RatingNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
