import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WantToListenListEntryDetailComponent } from './want-to-listen-list-entry-detail.component';

describe('WantToListenListEntry Management Detail Component', () => {
  let comp: WantToListenListEntryDetailComponent;
  let fixture: ComponentFixture<WantToListenListEntryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WantToListenListEntryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ wantToListenListEntry: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(WantToListenListEntryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WantToListenListEntryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load wantToListenListEntry on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.wantToListenListEntry).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
