import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNewComponent } from './navbar-new.component';

describe('NavbarNewComponent', () => {
  let component: NavbarNewComponent;
  let fixture: ComponentFixture<NavbarNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
