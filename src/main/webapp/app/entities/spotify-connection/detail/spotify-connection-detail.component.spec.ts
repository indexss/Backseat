import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpotifyConnectionDetailComponent } from './spotify-connection-detail.component';

describe('SpotifyConnection Management Detail Component', () => {
  let comp: SpotifyConnectionDetailComponent;
  let fixture: ComponentFixture<SpotifyConnectionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyConnectionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ spotifyConnection: { spotifyURI: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(SpotifyConnectionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SpotifyConnectionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load spotifyConnection on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.spotifyConnection).toEqual(expect.objectContaining({ spotifyURI: 'ABC' }));
    });
  });
});
