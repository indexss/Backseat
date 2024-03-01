import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FolderEntryDetailComponent } from './folder-entry-detail.component';

describe('FolderEntry Management Detail Component', () => {
  let comp: FolderEntryDetailComponent;
  let fixture: ComponentFixture<FolderEntryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderEntryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ folderEntry: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FolderEntryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FolderEntryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load folderEntry on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.folderEntry).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
