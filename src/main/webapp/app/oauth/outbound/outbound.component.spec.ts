import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundComponent } from './outbound.component';

describe('OutboundComponent', () => {
  let component: OutboundComponent;
  let fixture: ComponentFixture<OutboundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutboundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
