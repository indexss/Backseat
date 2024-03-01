import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlbumFormService } from './album-form.service';
import { AlbumService } from '../service/album.service';
import { IAlbum } from '../album.model';
import { IArtist } from 'app/entities/artist/artist.model';
import { ArtistService } from 'app/entities/artist/service/artist.service';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { FolderEntryService } from 'app/entities/folder-entry/service/folder-entry.service';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { WantToListenListEntryService } from 'app/entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';

import { AlbumUpdateComponent } from './album-update.component';

describe('Album Management Update Component', () => {
  let comp: AlbumUpdateComponent;
  let fixture: ComponentFixture<AlbumUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let albumFormService: AlbumFormService;
  let albumService: AlbumService;
  let artistService: ArtistService;
  let folderEntryService: FolderEntryService;
  let wantToListenListEntryService: WantToListenListEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlbumUpdateComponent],
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
      .overrideTemplate(AlbumUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlbumUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    albumFormService = TestBed.inject(AlbumFormService);
    albumService = TestBed.inject(AlbumService);
    artistService = TestBed.inject(ArtistService);
    folderEntryService = TestBed.inject(FolderEntryService);
    wantToListenListEntryService = TestBed.inject(WantToListenListEntryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Artist query and add missing value', () => {
      const album: IAlbum = { id: 456 };
      const artists: IArtist[] = [{ id: 13630 }];
      album.artists = artists;

      const artistCollection: IArtist[] = [{ id: 20501 }];
      jest.spyOn(artistService, 'query').mockReturnValue(of(new HttpResponse({ body: artistCollection })));
      const additionalArtists = [...artists];
      const expectedCollection: IArtist[] = [...additionalArtists, ...artistCollection];
      jest.spyOn(artistService, 'addArtistToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(artistService.query).toHaveBeenCalled();
      expect(artistService.addArtistToCollectionIfMissing).toHaveBeenCalledWith(
        artistCollection,
        ...additionalArtists.map(expect.objectContaining)
      );
      expect(comp.artistsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FolderEntry query and add missing value', () => {
      const album: IAlbum = { id: 456 };
      const folderEntries: IFolderEntry[] = [{ id: 92022 }];
      album.folderEntries = folderEntries;

      const folderEntryCollection: IFolderEntry[] = [{ id: 63009 }];
      jest.spyOn(folderEntryService, 'query').mockReturnValue(of(new HttpResponse({ body: folderEntryCollection })));
      const additionalFolderEntries = [...folderEntries];
      const expectedCollection: IFolderEntry[] = [...additionalFolderEntries, ...folderEntryCollection];
      jest.spyOn(folderEntryService, 'addFolderEntryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(folderEntryService.query).toHaveBeenCalled();
      expect(folderEntryService.addFolderEntryToCollectionIfMissing).toHaveBeenCalledWith(
        folderEntryCollection,
        ...additionalFolderEntries.map(expect.objectContaining)
      );
      expect(comp.folderEntriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call WantToListenListEntry query and add missing value', () => {
      const album: IAlbum = { id: 456 };
      const wantToListenListEntries: IWantToListenListEntry[] = [{ id: 45402 }];
      album.wantToListenListEntries = wantToListenListEntries;

      const wantToListenListEntryCollection: IWantToListenListEntry[] = [{ id: 27642 }];
      jest.spyOn(wantToListenListEntryService, 'query').mockReturnValue(of(new HttpResponse({ body: wantToListenListEntryCollection })));
      const additionalWantToListenListEntries = [...wantToListenListEntries];
      const expectedCollection: IWantToListenListEntry[] = [...additionalWantToListenListEntries, ...wantToListenListEntryCollection];
      jest.spyOn(wantToListenListEntryService, 'addWantToListenListEntryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(wantToListenListEntryService.query).toHaveBeenCalled();
      expect(wantToListenListEntryService.addWantToListenListEntryToCollectionIfMissing).toHaveBeenCalledWith(
        wantToListenListEntryCollection,
        ...additionalWantToListenListEntries.map(expect.objectContaining)
      );
      expect(comp.wantToListenListEntriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const album: IAlbum = { id: 456 };
      const artist: IArtist = { id: 95993 };
      album.artists = [artist];
      const folderEntry: IFolderEntry = { id: 38114 };
      album.folderEntries = [folderEntry];
      const wantToListenListEntry: IWantToListenListEntry = { id: 30005 };
      album.wantToListenListEntries = [wantToListenListEntry];

      activatedRoute.data = of({ album });
      comp.ngOnInit();

      expect(comp.artistsSharedCollection).toContain(artist);
      expect(comp.folderEntriesSharedCollection).toContain(folderEntry);
      expect(comp.wantToListenListEntriesSharedCollection).toContain(wantToListenListEntry);
      expect(comp.album).toEqual(album);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlbum>>();
      const album = { id: 123 };
      jest.spyOn(albumFormService, 'getAlbum').mockReturnValue(album);
      jest.spyOn(albumService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ album });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: album }));
      saveSubject.complete();

      // THEN
      expect(albumFormService.getAlbum).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(albumService.update).toHaveBeenCalledWith(expect.objectContaining(album));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlbum>>();
      const album = { id: 123 };
      jest.spyOn(albumFormService, 'getAlbum').mockReturnValue({ id: null });
      jest.spyOn(albumService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ album: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: album }));
      saveSubject.complete();

      // THEN
      expect(albumFormService.getAlbum).toHaveBeenCalled();
      expect(albumService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlbum>>();
      const album = { id: 123 };
      jest.spyOn(albumService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ album });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(albumService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareArtist', () => {
      it('Should forward to artistService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(artistService, 'compareArtist');
        comp.compareArtist(entity, entity2);
        expect(artistService.compareArtist).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareFolderEntry', () => {
      it('Should forward to folderEntryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(folderEntryService, 'compareFolderEntry');
        comp.compareFolderEntry(entity, entity2);
        expect(folderEntryService.compareFolderEntry).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareWantToListenListEntry', () => {
      it('Should forward to wantToListenListEntryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(wantToListenListEntryService, 'compareWantToListenListEntry');
        comp.compareWantToListenListEntry(entity, entity2);
        expect(wantToListenListEntryService.compareWantToListenListEntry).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
