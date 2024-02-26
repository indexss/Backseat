import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FolderEntryFormService } from './folder-entry-form.service';
import { FolderEntryService } from '../service/folder-entry.service';
import { IFolderEntry } from '../folder-entry.model';
import { IFolder } from 'app/entities/folder/folder.model';
import { FolderService } from 'app/entities/folder/service/folder.service';

import { FolderEntryUpdateComponent } from './folder-entry-update.component';

describe('FolderEntry Management Update Component', () => {
  let comp: FolderEntryUpdateComponent;
  let fixture: ComponentFixture<FolderEntryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let folderEntryFormService: FolderEntryFormService;
  let folderEntryService: FolderEntryService;
  let folderService: FolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FolderEntryUpdateComponent],
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
      .overrideTemplate(FolderEntryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FolderEntryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    folderEntryFormService = TestBed.inject(FolderEntryFormService);
    folderEntryService = TestBed.inject(FolderEntryService);
    folderService = TestBed.inject(FolderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Folder query and add missing value', () => {
      const folderEntry: IFolderEntry = { id: 456 };
      const folder: IFolder = { id: 66350 };
      folderEntry.folder = folder;

      const folderCollection: IFolder[] = [{ id: 44513 }];
      jest.spyOn(folderService, 'query').mockReturnValue(of(new HttpResponse({ body: folderCollection })));
      const additionalFolders = [folder];
      const expectedCollection: IFolder[] = [...additionalFolders, ...folderCollection];
      jest.spyOn(folderService, 'addFolderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ folderEntry });
      comp.ngOnInit();

      expect(folderService.query).toHaveBeenCalled();
      expect(folderService.addFolderToCollectionIfMissing).toHaveBeenCalledWith(
        folderCollection,
        ...additionalFolders.map(expect.objectContaining)
      );
      expect(comp.foldersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const folderEntry: IFolderEntry = { id: 456 };
      const folder: IFolder = { id: 97197 };
      folderEntry.folder = folder;

      activatedRoute.data = of({ folderEntry });
      comp.ngOnInit();

      expect(comp.foldersSharedCollection).toContain(folder);
      expect(comp.folderEntry).toEqual(folderEntry);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolderEntry>>();
      const folderEntry = { id: 123 };
      jest.spyOn(folderEntryFormService, 'getFolderEntry').mockReturnValue(folderEntry);
      jest.spyOn(folderEntryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folderEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: folderEntry }));
      saveSubject.complete();

      // THEN
      expect(folderEntryFormService.getFolderEntry).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(folderEntryService.update).toHaveBeenCalledWith(expect.objectContaining(folderEntry));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolderEntry>>();
      const folderEntry = { id: 123 };
      jest.spyOn(folderEntryFormService, 'getFolderEntry').mockReturnValue({ id: null });
      jest.spyOn(folderEntryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folderEntry: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: folderEntry }));
      saveSubject.complete();

      // THEN
      expect(folderEntryFormService.getFolderEntry).toHaveBeenCalled();
      expect(folderEntryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFolderEntry>>();
      const folderEntry = { id: 123 };
      jest.spyOn(folderEntryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ folderEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(folderEntryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFolder', () => {
      it('Should forward to folderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(folderService, 'compareFolder');
        comp.compareFolder(entity, entity2);
        expect(folderService.compareFolder).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
