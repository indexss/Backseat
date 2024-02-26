import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SpotifyConnectionService } from '../service/spotify-connection.service';

import { SpotifyConnectionComponent } from './spotify-connection.component';

describe('SpotifyConnection Management Component', () => {
  let comp: SpotifyConnectionComponent;
  let fixture: ComponentFixture<SpotifyConnectionComponent>;
  let service: SpotifyConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'spotify-connection', component: SpotifyConnectionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [SpotifyConnectionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(SpotifyConnectionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SpotifyConnectionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SpotifyConnectionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
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
    expect(comp.spotifyConnections?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to spotifyConnectionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSpotifyConnectionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSpotifyConnectionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
