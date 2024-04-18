import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFolderComponent } from './add-to-folder.component';

describe('AddToFolderComponent', () => {
  let component: AddToFolderComponent;
  let fixture: ComponentFixture<AddToFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToFolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
