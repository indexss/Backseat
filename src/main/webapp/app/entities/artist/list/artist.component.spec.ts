import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ArtistService } from '../service/artist.service';

import { ArtistComponent } from './artist.component';
import SpyInstance = jest.SpyInstance;

describe('Artist Management Component', () => {
  let comp: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let service: ArtistService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'artist', component: ArtistComponent }]), HttpClientTestingModule],
      declarations: [ArtistComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'spotifyURI,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'spotifyURI,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ArtistComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ArtistComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ArtistService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ spotifyURI: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.artists?.[0]).toEqual(expect.objectContaining({ spotifyURI: 'ABC' }));
  });

  describe('trackSpotifyURI', () => {
    it('Should forward to artistService', () => {
      const entity = { spotifyURI: 'ABC' };
      jest.spyOn(service, 'getArtistIdentifier');
      const spotifyURI = comp.trackSpotifyURI(0, entity);
      expect(service.getArtistIdentifier).toHaveBeenCalledWith(entity);
      expect(spotifyURI).toBe(entity.spotifyURI);
    });
  });

  it('should load a page', () => {
    // WHEN
    comp.navigateToPage(1);

    // THEN
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['spotifyURI,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.navigateToWithComponentValues();

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['name,asc'],
        }),
      })
    );
  });
});
