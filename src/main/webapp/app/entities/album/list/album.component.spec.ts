import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AlbumService } from '../service/album.service';

import { AlbumComponent } from './album.component';
import SpyInstance = jest.SpyInstance;

describe('Album Management Component', () => {
  let comp: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let service: AlbumService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'album', component: AlbumComponent }]), HttpClientTestingModule],
      declarations: [AlbumComponent],
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
      .overrideTemplate(AlbumComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AlbumService);
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
    expect(comp.albums?.[0]).toEqual(expect.objectContaining({ spotifyURI: 'ABC' }));
  });

  describe('trackSpotifyURI', () => {
    it('Should forward to albumService', () => {
      const entity = { spotifyURI: 'ABC' };
      jest.spyOn(service, 'getAlbumIdentifier');
      const spotifyURI = comp.trackSpotifyURI(0, entity);
      expect(service.getAlbumIdentifier).toHaveBeenCalledWith(entity);
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
