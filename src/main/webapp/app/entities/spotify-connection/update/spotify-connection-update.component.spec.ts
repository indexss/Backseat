import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SpotifyConnectionFormService } from './spotify-connection-form.service';
import { SpotifyConnectionService } from '../service/spotify-connection.service';
import { ISpotifyConnection } from '../spotify-connection.model';

import { SpotifyConnectionUpdateComponent } from './spotify-connection-update.component';

describe('SpotifyConnection Management Update Component', () => {
  let comp: SpotifyConnectionUpdateComponent;
  let fixture: ComponentFixture<SpotifyConnectionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let spotifyConnectionFormService: SpotifyConnectionFormService;
  let spotifyConnectionService: SpotifyConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SpotifyConnectionUpdateComponent],
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
      .overrideTemplate(SpotifyConnectionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SpotifyConnectionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    spotifyConnectionFormService = TestBed.inject(SpotifyConnectionFormService);
    spotifyConnectionService = TestBed.inject(SpotifyConnectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const spotifyConnection: ISpotifyConnection = { spotifyURI: 'CBA' };

      activatedRoute.data = of({ spotifyConnection });
      comp.ngOnInit();

      expect(comp.spotifyConnection).toEqual(spotifyConnection);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpotifyConnection>>();
      const spotifyConnection = { spotifyURI: 'ABC' };
      jest.spyOn(spotifyConnectionFormService, 'getSpotifyConnection').mockReturnValue(spotifyConnection);
      jest.spyOn(spotifyConnectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ spotifyConnection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: spotifyConnection }));
      saveSubject.complete();

      // THEN
      expect(spotifyConnectionFormService.getSpotifyConnection).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(spotifyConnectionService.update).toHaveBeenCalledWith(expect.objectContaining(spotifyConnection));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpotifyConnection>>();
      const spotifyConnection = { spotifyURI: 'ABC' };
      jest.spyOn(spotifyConnectionFormService, 'getSpotifyConnection').mockReturnValue({ spotifyURI: null });
      jest.spyOn(spotifyConnectionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ spotifyConnection: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: spotifyConnection }));
      saveSubject.complete();

      // THEN
      expect(spotifyConnectionFormService.getSpotifyConnection).toHaveBeenCalled();
      expect(spotifyConnectionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpotifyConnection>>();
      const spotifyConnection = { spotifyURI: 'ABC' };
      jest.spyOn(spotifyConnectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ spotifyConnection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(spotifyConnectionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
