import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ArtistFormService } from './artist-form.service';
import { ArtistService } from '../service/artist.service';
import { IArtist } from '../artist.model';

import { ArtistUpdateComponent } from './artist-update.component';

describe('Artist Management Update Component', () => {
  let comp: ArtistUpdateComponent;
  let fixture: ComponentFixture<ArtistUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let artistFormService: ArtistFormService;
  let artistService: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ArtistUpdateComponent],
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
      .overrideTemplate(ArtistUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ArtistUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    artistFormService = TestBed.inject(ArtistFormService);
    artistService = TestBed.inject(ArtistService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const artist: IArtist = { id: 456 };

      activatedRoute.data = of({ artist });
      comp.ngOnInit();

      expect(comp.artist).toEqual(artist);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArtist>>();
      const artist = { id: 123 };
      jest.spyOn(artistFormService, 'getArtist').mockReturnValue(artist);
      jest.spyOn(artistService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ artist });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: artist }));
      saveSubject.complete();

      // THEN
      expect(artistFormService.getArtist).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(artistService.update).toHaveBeenCalledWith(expect.objectContaining(artist));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArtist>>();
      const artist = { id: 123 };
      jest.spyOn(artistFormService, 'getArtist').mockReturnValue({ id: null });
      jest.spyOn(artistService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ artist: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: artist }));
      saveSubject.complete();

      // THEN
      expect(artistFormService.getArtist).toHaveBeenCalled();
      expect(artistService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArtist>>();
      const artist = { id: 123 };
      jest.spyOn(artistService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ artist });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(artistService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
