import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISpotifyConnection } from '../spotify-connection.model';
import { SpotifyConnectionService } from '../service/spotify-connection.service';

import { SpotifyConnectionRoutingResolveService } from './spotify-connection-routing-resolve.service';

describe('SpotifyConnection routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SpotifyConnectionRoutingResolveService;
  let service: SpotifyConnectionService;
  let resultSpotifyConnection: ISpotifyConnection | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(SpotifyConnectionRoutingResolveService);
    service = TestBed.inject(SpotifyConnectionService);
    resultSpotifyConnection = undefined;
  });

  describe('resolve', () => {
    it('should return ISpotifyConnection returned by find', () => {
      // GIVEN
      service.find = jest.fn(spotifyURI => of(new HttpResponse({ body: { spotifyURI } })));
      mockActivatedRouteSnapshot.params = { spotifyURI: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSpotifyConnection = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultSpotifyConnection).toEqual({ spotifyURI: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSpotifyConnection = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSpotifyConnection).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISpotifyConnection>({ body: null })));
      mockActivatedRouteSnapshot.params = { spotifyURI: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSpotifyConnection = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultSpotifyConnection).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
