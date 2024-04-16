import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWantToListenItemComponent } from './add-new-want-to-listen-item.component';

describe('AddNewWantToListenItemComponent', () => {
  let component: AddNewWantToListenItemComponent;
  let fixture: ComponentFixture<AddNewWantToListenItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewWantToListenItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewWantToListenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
