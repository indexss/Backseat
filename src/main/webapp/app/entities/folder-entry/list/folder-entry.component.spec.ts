import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FolderEntryService } from '../service/folder-entry.service';

import { FolderEntryComponent } from './folder-entry.component';

describe('FolderEntry Management Component', () => {
  let comp: FolderEntryComponent;
  let fixture: ComponentFixture<FolderEntryComponent>;
  let service: FolderEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'folder-entry', component: FolderEntryComponent }]), HttpClientTestingModule],
      declarations: [FolderEntryComponent],
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
      .overrideTemplate(FolderEntryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FolderEntryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FolderEntryService);

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
    expect(comp.folderEntries?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to folderEntryService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFolderEntryIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFolderEntryIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
