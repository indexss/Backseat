import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';
import { WantToListenListEntryService } from '../service/want-to-listen-list-entry.service';

import { WantToListenListEntryRoutingResolveService } from './want-to-listen-list-entry-routing-resolve.service';

describe('WantToListenListEntry routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: WantToListenListEntryRoutingResolveService;
  let service: WantToListenListEntryService;
  let resultWantToListenListEntry: IWantToListenListEntry | null | undefined;

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
    routingResolveService = TestBed.inject(WantToListenListEntryRoutingResolveService);
    service = TestBed.inject(WantToListenListEntryService);
    resultWantToListenListEntry = undefined;
  });

  describe('resolve', () => {
    it('should return IWantToListenListEntry returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWantToListenListEntry = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWantToListenListEntry).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWantToListenListEntry = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultWantToListenListEntry).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IWantToListenListEntry>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultWantToListenListEntry = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultWantToListenListEntry).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
