import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FolderFormService } from './folder-form.service';
import { FolderService } from '../service/folder.service';
import { IFolder } from '../folder.model';
import { IProfile } from 'app/entities/profile/profile.model';
import { ProfileService } from 'app/entities/profile/service/profile.service';

import { FolderUpdateComponent } from './folder-update.component';

describe('Folder Management Update Component', () => {
  let comp: FolderUpdateComponent;
  let fixture: ComponentFixture<FolderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let folderFormService: FolderFormService;
  let folderService: FolderService;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FolderUpdateComponent],
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
      .overrideTemplate(FolderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FolderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    folderFormService = TestBed.inject(FolderFormService);
    folderService = TestBed.inject(FolderService);
    profileService = TestBed.inject(ProfileService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Profile query and add missing value', () => {
      const folder: IFolder = { id: 456 };
      const profile: IProfile = { id: 85063 };
      folder.profile = profile;

      const profileCollection: IProfile[] = [{ id: 66408 }];
      jest.spyOn(profileService, 'query').mockReturnValue(of(new HttpResponse({ body: profileCollection })));
      const additionalProfiles = [profile];
      const expectedCollection: IProfile[] = [...additionalProfiles, ...profileCollection];
      jest.spyOn(profileService, 'addProfileToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      expect(profileService.query).toHaveBeenCalled();
      expect(profileService.addProfileToCollectionIfMissing).toHaveBeenCalledWith(
        profileCollection,
        ...additionalProfiles.map(expect.objectContaining)
      );
      expect(comp.profilesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const folder: IFolder = { id: 456 };
      const profile: IProfile = { id: 66170 };
      folder.profile = profile;

      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      expect(comp.profilesSharedCollection).toContain(profile);
      expect(comp.folder).toEqual(folder);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolder>>();
      const folder = { id: 123 };
      jest.spyOn(folderFormService, 'getFolder').mockReturnValue(folder);
      jest.spyOn(folderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: folder }));
      saveSubject.complete();

      // THEN
      expect(folderFormService.getFolder).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(folderService.update).toHaveBeenCalledWith(expect.objectContaining(folder));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolder>>();
      const folder = { id: 123 };
      jest.spyOn(folderFormService, 'getFolder').mockReturnValue({ id: null });
      jest.spyOn(folderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folder: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: folder }));
      saveSubject.complete();

      // THEN
      expect(folderFormService.getFolder).toHaveBeenCalled();
      expect(folderService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolder>>();
      const folder = { id: 123 };
      jest.spyOn(folderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(folderService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProfile', () => {
      it('Should forward to profileService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(profileService, 'compareProfile');
        comp.compareProfile(entity, entity2);
        expect(profileService.compareProfile).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
