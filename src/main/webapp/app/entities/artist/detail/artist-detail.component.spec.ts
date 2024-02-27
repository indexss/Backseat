import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArtistDetailComponent } from './artist-detail.component';

describe('Artist Management Detail Component', () => {
  let comp: ArtistDetailComponent;
  let fixture: ComponentFixture<ArtistDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ artist: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ArtistDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ArtistDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load artist on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.artist).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
