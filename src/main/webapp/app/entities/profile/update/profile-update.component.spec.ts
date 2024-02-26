import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProfileFormService } from './profile-form.service';
import { ProfileService } from '../service/profile.service';
import { IProfile } from '../profile.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ISpotifyConnection } from 'app/entities/spotify-connection/spotify-connection.model';
import { SpotifyConnectionService } from 'app/entities/spotify-connection/service/spotify-connection.service';

import { ProfileUpdateComponent } from './profile-update.component';

describe('Profile Management Update Component', () => {
  let comp: ProfileUpdateComponent;
  let fixture: ComponentFixture<ProfileUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let profileFormService: ProfileFormService;
  let profileService: ProfileService;
  let userService: UserService;
  let spotifyConnectionService: SpotifyConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProfileUpdateComponent],
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
      .overrideTemplate(ProfileUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfileUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    profileFormService = TestBed.inject(ProfileFormService);
    profileService = TestBed.inject(ProfileService);
    userService = TestBed.inject(UserService);
    spotifyConnectionService = TestBed.inject(SpotifyConnectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const profile: IProfile = { id: 456 };
      const user: IUser = { id: 81890 };
      profile.user = user;

      const userCollection: IUser[] = [{ id: 61017 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profile });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call spotifyConnection query and add missing value', () => {
      const profile: IProfile = { id: 456 };
      const spotifyConnection: ISpotifyConnection = { id: 5694 };
      profile.spotifyConnection = spotifyConnection;

      const spotifyConnectionCollection: ISpotifyConnection[] = [{ id: 55052 }];
      jest.spyOn(spotifyConnectionService, 'query').mockReturnValue(of(new HttpResponse({ body: spotifyConnectionCollection })));
      const expectedCollection: ISpotifyConnection[] = [spotifyConnection, ...spotifyConnectionCollection];
      jest.spyOn(spotifyConnectionService, 'addSpotifyConnectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profile });
      comp.ngOnInit();

      expect(spotifyConnectionService.query).toHaveBeenCalled();
      expect(spotifyConnectionService.addSpotifyConnectionToCollectionIfMissing).toHaveBeenCalledWith(
        spotifyConnectionCollection,
        spotifyConnection
      );
      expect(comp.spotifyConnectionsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const profile: IProfile = { id: 456 };
      const user: IUser = { id: 63630 };
      profile.user = user;
      const spotifyConnection: ISpotifyConnection = { id: 97005 };
      profile.spotifyConnection = spotifyConnection;

      activatedRoute.data = of({ profile });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.spotifyConnectionsCollection).toContain(spotifyConnection);
      expect(comp.profile).toEqual(profile);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfile>>();
      const profile = { id: 123 };
      jest.spyOn(profileFormService, 'getProfile').mockReturnValue(profile);
      jest.spyOn(profileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profile });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profile }));
      saveSubject.complete();

      // THEN
      expect(profileFormService.getProfile).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(profileService.update).toHaveBeenCalledWith(expect.objectContaining(profile));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfile>>();
      const profile = { id: 123 };
      jest.spyOn(profileFormService, 'getProfile').mockReturnValue({ id: null });
      jest.spyOn(profileService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profile: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profile }));
      saveSubject.complete();

      // THEN
      expect(profileFormService.getProfile).toHaveBeenCalled();
      expect(profileService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfile>>();
      const profile = { id: 123 };
      jest.spyOn(profileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profile });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(profileService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSpotifyConnection', () => {
      it('Should forward to spotifyConnectionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(spotifyConnectionService, 'compareSpotifyConnection');
        comp.compareSpotifyConnection(entity, entity2);
        expect(spotifyConnectionService.compareSpotifyConnection).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
