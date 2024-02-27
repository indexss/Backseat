import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TrackFormService } from './track-form.service';
import { TrackService } from '../service/track.service';
import { ITrack } from '../track.model';
import { IArtist } from 'app/entities/artist/artist.model';
import { ArtistService } from 'app/entities/artist/service/artist.service';
import { IFolderEntry } from 'app/entities/folder-entry/folder-entry.model';
import { FolderEntryService } from 'app/entities/folder-entry/service/folder-entry.service';
import { IWantToListenListEntry } from 'app/entities/want-to-listen-list-entry/want-to-listen-list-entry.model';
import { WantToListenListEntryService } from 'app/entities/want-to-listen-list-entry/service/want-to-listen-list-entry.service';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

import { TrackUpdateComponent } from './track-update.component';

describe('Track Management Update Component', () => {
  let comp: TrackUpdateComponent;
  let fixture: ComponentFixture<TrackUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let trackFormService: TrackFormService;
  let trackService: TrackService;
  let artistService: ArtistService;
  let folderEntryService: FolderEntryService;
  let wantToListenListEntryService: WantToListenListEntryService;
  let albumService: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TrackUpdateComponent],
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
      .overrideTemplate(TrackUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrackUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trackFormService = TestBed.inject(TrackFormService);
    trackService = TestBed.inject(TrackService);
    artistService = TestBed.inject(ArtistService);
    folderEntryService = TestBed.inject(FolderEntryService);
    wantToListenListEntryService = TestBed.inject(WantToListenListEntryService);
    albumService = TestBed.inject(AlbumService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Artist query and add missing value', () => {
      const track: ITrack = { id: 456 };
      const artists: IArtist[] = [{ id: 30428 }];
      track.artists = artists;

      const artistCollection: IArtist[] = [{ id: 76435 }];
      jest.spyOn(artistService, 'query').mockReturnValue(of(new HttpResponse({ body: artistCollection })));
      const additionalArtists = [...artists];
      const expectedCollection: IArtist[] = [...additionalArtists, ...artistCollection];
      jest.spyOn(artistService, 'addArtistToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ track });
      comp.ngOnInit();

      expect(artistService.query).toHaveBeenCalled();
      expect(artistService.addArtistToCollectionIfMissing).toHaveBeenCalledWith(
        artistCollection,
        ...additionalArtists.map(expect.objectContaining)
      );
      expect(comp.artistsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FolderEntry query and add missing value', () => {
      const track: ITrack = { id: 456 };
      const folderEntries: IFolderEntry[] = [{ id: 66426 }];
      track.folderEntries = folderEntries;

      const folderEntryCollection: IFolderEntry[] = [{ id: 36443 }];
      jest.spyOn(folderEntryService, 'query').mockReturnValue(of(new HttpResponse({ body: folderEntryCollection })));
      const additionalFolderEntries = [...folderEntries];
      const expectedCollection: IFolderEntry[] = [...additionalFolderEntries, ...folderEntryCollection];
      jest.spyOn(folderEntryService, 'addFolderEntryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ track });
      comp.ngOnInit();

      expect(folderEntryService.query).toHaveBeenCalled();
      expect(folderEntryService.addFolderEntryToCollectionIfMissing).toHaveBeenCalledWith(
        folderEntryCollection,
        ...additionalFolderEntries.map(expect.objectContaining)
      );
      expect(comp.folderEntriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call WantToListenListEntry query and add missing value', () => {
      const track: ITrack = { id: 456 };
      const wantToListenListEntries: IWantToListenListEntry[] = [{ id: 91812 }];
      track.wantToListenListEntries = wantToListenListEntries;

      const wantToListenListEntryCollection: IWantToListenListEntry[] = [{ id: 70405 }];
      jest.spyOn(wantToListenListEntryService, 'query').mockReturnValue(of(new HttpResponse({ body: wantToListenListEntryCollection })));
      const additionalWantToListenListEntries = [...wantToListenListEntries];
      const expectedCollection: IWantToListenListEntry[] = [...additionalWantToListenListEntries, ...wantToListenListEntryCollection];
      jest.spyOn(wantToListenListEntryService, 'addWantToListenListEntryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ track });
      comp.ngOnInit();

      expect(wantToListenListEntryService.query).toHaveBeenCalled();
      expect(wantToListenListEntryService.addWantToListenListEntryToCollectionIfMissing).toHaveBeenCalledWith(
        wantToListenListEntryCollection,
        ...additionalWantToListenListEntries.map(expect.objectContaining)
      );
      expect(comp.wantToListenListEntriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Album query and add missing value', () => {
      const track: ITrack = { id: 456 };
      const album: IAlbum = { id: 73103 };
      track.album = album;

      const albumCollection: IAlbum[] = [{ id: 87588 }];
      jest.spyOn(albumService, 'query').mockReturnValue(of(new HttpResponse({ body: albumCollection })));
      const additionalAlbums = [album];
      const expectedCollection: IAlbum[] = [...additionalAlbums, ...albumCollection];
      jest.spyOn(albumService, 'addAlbumToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ track });
      comp.ngOnInit();

      expect(albumService.query).toHaveBeenCalled();
      expect(albumService.addAlbumToCollectionIfMissing).toHaveBeenCalledWith(
        albumCollection,
        ...additionalAlbums.map(expect.objectContaining)
      );
      expect(comp.albumsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const track: ITrack = { id: 456 };
      const artist: IArtist = { id: 50702 };
      track.artists = [artist];
      const folderEntry: IFolderEntry = { id: 45935 };
      track.folderEntries = [folderEntry];
      const wantToListenListEntry: IWantToListenListEntry = { id: 84478 };
      track.wantToListenListEntries = [wantToListenListEntry];
      const album: IAlbum = { id: 26665 };
      track.album = album;

      activatedRoute.data = of({ track });
      comp.ngOnInit();

      expect(comp.artistsSharedCollection).toContain(artist);
      expect(comp.folderEntriesSharedCollection).toContain(folderEntry);
      expect(comp.wantToListenListEntriesSharedCollection).toContain(wantToListenListEntry);
      expect(comp.albumsSharedCollection).toContain(album);
      expect(comp.track).toEqual(track);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrack>>();
      const track = { id: 123 };
      jest.spyOn(trackFormService, 'getTrack').mockReturnValue(track);
      jest.spyOn(trackService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ track });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: track }));
      saveSubject.complete();

      // THEN
      expect(trackFormService.getTrack).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(trackService.update).toHaveBeenCalledWith(expect.objectContaining(track));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrack>>();
      const track = { id: 123 };
      jest.spyOn(trackFormService, 'getTrack').mockReturnValue({ id: null });
      jest.spyOn(trackService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ track: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: track }));
      saveSubject.complete();

      // THEN
      expect(trackFormService.getTrack).toHaveBeenCalled();
      expect(trackService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrack>>();
      const track = { id: 123 };
      jest.spyOn(trackService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ track });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trackService.update).toHaveBeenCalled();
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

    describe('compareAlbum', () => {
      it('Should forward to albumService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(albumService, 'compareAlbum');
        comp.compareAlbum(entity, entity2);
        expect(albumService.compareAlbum).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
