import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WantToListenListEntryFormService } from './want-to-listen-list-entry-form.service';
import { WantToListenListEntryService } from '../service/want-to-listen-list-entry.service';
import { IWantToListenListEntry } from '../want-to-listen-list-entry.model';

import { WantToListenListEntryUpdateComponent } from './want-to-listen-list-entry-update.component';

describe('WantToListenListEntry Management Update Component', () => {
  let comp: WantToListenListEntryUpdateComponent;
  let fixture: ComponentFixture<WantToListenListEntryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let wantToListenListEntryFormService: WantToListenListEntryFormService;
  let wantToListenListEntryService: WantToListenListEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WantToListenListEntryUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(WantToListenListEntryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WantToListenListEntryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    wantToListenListEntryFormService = TestBed.inject(WantToListenListEntryFormService);
    wantToListenListEntryService = TestBed.inject(WantToListenListEntryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const wantToListenListEntry: IWantToListenListEntry = { id: 456 };

      activatedRoute.data = of({ wantToListenListEntry });
      comp.ngOnInit();

      expect(comp.wantToListenListEntry).toEqual(wantToListenListEntry);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWantToListenListEntry>>();
      const wantToListenListEntry = { id: 123 };
      jest.spyOn(wantToListenListEntryFormService, 'getWantToListenListEntry').mockReturnValue(wantToListenListEntry);
      jest.spyOn(wantToListenListEntryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wantToListenListEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wantToListenListEntry }));
      saveSubject.complete();

      // THEN
      expect(wantToListenListEntryFormService.getWantToListenListEntry).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(wantToListenListEntryService.update).toHaveBeenCalledWith(expect.objectContaining(wantToListenListEntry));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWantToListenListEntry>>();
      const wantToListenListEntry = { id: 123 };
      jest.spyOn(wantToListenListEntryFormService, 'getWantToListenListEntry').mockReturnValue({ id: null });
      jest.spyOn(wantToListenListEntryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wantToListenListEntry: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wantToListenListEntry }));
      saveSubject.complete();

      // THEN
      expect(wantToListenListEntryFormService.getWantToListenListEntry).toHaveBeenCalled();
      expect(wantToListenListEntryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWantToListenListEntry>>();
      const wantToListenListEntry = { id: 123 };
      jest.spyOn(wantToListenListEntryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wantToListenListEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(wantToListenListEntryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
