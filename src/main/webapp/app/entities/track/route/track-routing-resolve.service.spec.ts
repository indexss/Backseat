import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITrack } from '../track.model';
import { TrackService } from '../service/track.service';

import { TrackRoutingResolveService } from './track-routing-resolve.service';

describe('Track routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TrackRoutingResolveService;
  let service: TrackService;
  let resultTrack: ITrack | null | undefined;

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
    routingResolveService = TestBed.inject(TrackRoutingResolveService);
    service = TestBed.inject(TrackService);
    resultTrack = undefined;
  });

  describe('resolve', () => {
    it('should return ITrack returned by find', () => {
      // GIVEN
      service.find = jest.fn(spotifyURI => of(new HttpResponse({ body: { spotifyURI } })));
      mockActivatedRouteSnapshot.params = { spotifyURI: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTrack = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultTrack).toEqual({ spotifyURI: 'ABC' });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTrack = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTrack).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITrack>({ body: null })));
      mockActivatedRouteSnapshot.params = { spotifyURI: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTrack = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultTrack).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
