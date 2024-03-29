import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToListenComponent } from './want-to-listen.component';

describe('WantToListenComponent', () => {
  let component: WantToListenComponent;
  let fixture: ComponentFixture<WantToListenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WantToListenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WantToListenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
