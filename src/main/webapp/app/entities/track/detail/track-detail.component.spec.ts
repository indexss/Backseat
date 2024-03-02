import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrackDetailComponent } from './track-detail.component';

describe('Track Management Detail Component', () => {
  let comp: TrackDetailComponent;
  let fixture: ComponentFixture<TrackDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ track: { spotifyURI: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(TrackDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TrackDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load track on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.track).toEqual(expect.objectContaining({ spotifyURI: 'ABC' }));
    });
  });
});
