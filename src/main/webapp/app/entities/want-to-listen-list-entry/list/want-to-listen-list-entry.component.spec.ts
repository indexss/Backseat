import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { WantToListenListEntryService } from '../service/want-to-listen-list-entry.service';

import { WantToListenListEntryComponent } from './want-to-listen-list-entry.component';

describe('WantToListenListEntry Management Component', () => {
  let comp: WantToListenListEntryComponent;
  let fixture: ComponentFixture<WantToListenListEntryComponent>;
  let service: WantToListenListEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'want-to-listen-list-entry', component: WantToListenListEntryComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [WantToListenListEntryComponent],
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
      .overrideTemplate(WantToListenListEntryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WantToListenListEntryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(WantToListenListEntryService);

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
    expect(comp.wantToListenListEntries?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to wantToListenListEntryService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getWantToListenListEntryIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getWantToListenListEntryIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
