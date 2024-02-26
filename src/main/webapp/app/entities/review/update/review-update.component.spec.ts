import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReviewFormService } from './review-form.service';
import { ReviewService } from '../service/review.service';
import { IReview } from '../review.model';
import { IProfile } from 'app/entities/profile/profile.model';
import { ProfileService } from 'app/entities/profile/service/profile.service';
import { ITrack } from 'app/entities/track/track.model';
import { TrackService } from 'app/entities/track/service/track.service';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

import { ReviewUpdateComponent } from './review-update.component';

describe('Review Management Update Component', () => {
  let comp: ReviewUpdateComponent;
  let fixture: ComponentFixture<ReviewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reviewFormService: ReviewFormService;
  let reviewService: ReviewService;
  let profileService: ProfileService;
  let trackService: TrackService;
  let albumService: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReviewUpdateComponent],
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
      .overrideTemplate(ReviewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReviewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reviewFormService = TestBed.inject(ReviewFormService);
    reviewService = TestBed.inject(ReviewService);
    profileService = TestBed.inject(ProfileService);
    trackService = TestBed.inject(TrackService);
    albumService = TestBed.inject(AlbumService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Profile query and add missing value', () => {
      const review: IReview = { id: 456 };
      const profile: IProfile = { id: 57949 };
      review.profile = profile;

      const profileCollection: IProfile[] = [{ id: 79931 }];
      jest.spyOn(profileService, 'query').mockReturnValue(of(new HttpResponse({ body: profileCollection })));
      const additionalProfiles = [profile];
      const expectedCollection: IProfile[] = [...additionalProfiles, ...profileCollection];
      jest.spyOn(profileService, 'addProfileToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ review });
      comp.ngOnInit();

      expect(profileService.query).toHaveBeenCalled();
      expect(profileService.addProfileToCollectionIfMissing).toHaveBeenCalledWith(
        profileCollection,
        ...additionalProfiles.map(expect.objectContaining)
      );
      expect(comp.profilesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Track query and add missing value', () => {
      const review: IReview = { id: 456 };
      const track: ITrack = { id: 33022 };
      review.track = track;

      const trackCollection: ITrack[] = [{ id: 24505 }];
      jest.spyOn(trackService, 'query').mockReturnValue(of(new HttpResponse({ body: trackCollection })));
      const additionalTracks = [track];
      const expectedCollection: ITrack[] = [...additionalTracks, ...trackCollection];
      jest.spyOn(trackService, 'addTrackToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ review });
      comp.ngOnInit();

      expect(trackService.query).toHaveBeenCalled();
      expect(trackService.addTrackToCollectionIfMissing).toHaveBeenCalledWith(
        trackCollection,
        ...additionalTracks.map(expect.objectContaining)
      );
      expect(comp.tracksSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Album query and add missing value', () => {
      const review: IReview = { id: 456 };
      const album: IAlbum = { id: 4872 };
      review.album = album;

      const albumCollection: IAlbum[] = [{ id: 28602 }];
      jest.spyOn(albumService, 'query').mockReturnValue(of(new HttpResponse({ body: albumCollection })));
      const additionalAlbums = [album];
      const expectedCollection: IAlbum[] = [...additionalAlbums, ...albumCollection];
      jest.spyOn(albumService, 'addAlbumToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ review });
      comp.ngOnInit();

      expect(albumService.query).toHaveBeenCalled();
      expect(albumService.addAlbumToCollectionIfMissing).toHaveBeenCalledWith(
        albumCollection,
        ...additionalAlbums.map(expect.objectContaining)
      );
      expect(comp.albumsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const review: IReview = { id: 456 };
      const profile: IProfile = { id: 72645 };
      review.profile = profile;
      const track: ITrack = { id: 32597 };
      review.track = track;
      const album: IAlbum = { id: 3780 };
      review.album = album;

      activatedRoute.data = of({ review });
      comp.ngOnInit();

      expect(comp.profilesSharedCollection).toContain(profile);
      expect(comp.tracksSharedCollection).toContain(track);
      expect(comp.albumsSharedCollection).toContain(album);
      expect(comp.review).toEqual(review);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReview>>();
      const review = { id: 123 };
      jest.spyOn(reviewFormService, 'getReview').mockReturnValue(review);
      jest.spyOn(reviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ review });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: review }));
      saveSubject.complete();

      // THEN
      expect(reviewFormService.getReview).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reviewService.update).toHaveBeenCalledWith(expect.objectContaining(review));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReview>>();
      const review = { id: 123 };
      jest.spyOn(reviewFormService, 'getReview').mockReturnValue({ id: null });
      jest.spyOn(reviewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ review: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: review }));
      saveSubject.complete();

      // THEN
      expect(reviewFormService.getReview).toHaveBeenCalled();
      expect(reviewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReview>>();
      const review = { id: 123 };
      jest.spyOn(reviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ review });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reviewService.update).toHaveBeenCalled();
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

    describe('compareTrack', () => {
      it('Should forward to trackService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(trackService, 'compareTrack');
        comp.compareTrack(entity, entity2);
        expect(trackService.compareTrack).toHaveBeenCalledWith(entity, entity2);
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
