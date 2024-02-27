import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FollowDetailComponent } from './follow-detail.component';

describe('Follow Management Detail Component', () => {
  let comp: FollowDetailComponent;
  let fixture: ComponentFixture<FollowDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ follow: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FollowDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FollowDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load follow on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.follow).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
