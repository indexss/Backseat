import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SettingFormService } from './setting-form.service';
import { SettingService } from '../service/setting.service';
import { ISetting } from '../setting.model';

import { SettingUpdateComponent } from './setting-update.component';

describe('Setting Management Update Component', () => {
  let comp: SettingUpdateComponent;
  let fixture: ComponentFixture<SettingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let settingFormService: SettingFormService;
  let settingService: SettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SettingUpdateComponent],
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
      .overrideTemplate(SettingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SettingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    settingFormService = TestBed.inject(SettingFormService);
    settingService = TestBed.inject(SettingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const setting: ISetting = { id: 456 };

      activatedRoute.data = of({ setting });
      comp.ngOnInit();

      expect(comp.setting).toEqual(setting);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISetting>>();
      const setting = { id: 123 };
      jest.spyOn(settingFormService, 'getSetting').mockReturnValue(setting);
      jest.spyOn(settingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ setting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: setting }));
      saveSubject.complete();

      // THEN
      expect(settingFormService.getSetting).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(settingService.update).toHaveBeenCalledWith(expect.objectContaining(setting));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISetting>>();
      const setting = { id: 123 };
      jest.spyOn(settingFormService, 'getSetting').mockReturnValue({ id: null });
      jest.spyOn(settingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ setting: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: setting }));
      saveSubject.complete();

      // THEN
      expect(settingFormService.getSetting).toHaveBeenCalled();
      expect(settingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISetting>>();
      const setting = { id: 123 };
      jest.spyOn(settingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ setting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(settingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
