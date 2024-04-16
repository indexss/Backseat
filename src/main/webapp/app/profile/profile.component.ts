import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../core/auth/account.service';
import { ProfileService } from '../entities/profile/service/profile.service';
import { ProfileInfo } from '../layouts/profiles/profile-info.model';
import { IProfile } from '../entities/profile/profile.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../core/config/application-config.service';
import { IUser } from '../entities/user/user.model';
import { ISpotifyConnection } from '../entities/spotify-connection/spotify-connection.model';
import { FollowService } from '../entities/follow/service/follow.service';

interface ModUser {
  id: number;
  login?: string;
  createdDate: string;
}

interface ModProfile {
  id: number;
  username?: string | null;
  spotifyURI?: string | null;
  profilePhoto?: string | null;
  profilePhotoContentType?: string | null;
  user?: ModUser | null;
  spotifyConnection?: Pick<ISpotifyConnection, 'spotifyURI'> | null;
}

interface AbbreviatedFollow {
  target: string;
  photoURL: string;
}

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  protected isSelf: boolean;
  private login: string | null;
  protected profile: ModProfile | null = null;
  protected profilePhotoURL: string | null = null;
  protected isFollowing: boolean | null = null;
  protected friends: AbbreviatedFollow[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private followService: FollowService,
    private profileService: ProfileService,
  ) {
    this.isSelf = false;
    this.login = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(acc => {
      if (acc == null) {
        return;
      }

      if (acc.login == this.login) {
        this.isSelf = true;
      }

      if (this.isSelf) {
        this.http.get<AbbreviatedFollow[]>(this.applicationConfigService.getEndpointFor('/api/follows/mine')).subscribe({
          next: v => {
            this.friends = v;
          },
        });
      } else {
        this.http.get<boolean>(this.applicationConfigService.getEndpointFor('/api/follows/check/' + this.login)).subscribe({
          next: v => {
            console.debug('Follows?', v);
            this.isFollowing = v;
          },
          error: err => {
            alert('Failed to get follow status: ' + JSON.stringify(err));
          },
        });
      }
    });

    this.http.get<ModProfile>(this.applicationConfigService.getEndpointFor('/api/profiles/byLogin/' + this.login)).subscribe({
      next: res => {
        this.profile = res;
        this.http
          .get<string>(this.applicationConfigService.getEndpointFor('/api/profiles/byLogin/' + this.login + '/profilePhoto'))
          .subscribe({
            next: v => {
              console.debug('Profile photo URL: ', v);
              this.profilePhotoURL = v;
            },
          });
        console.debug('Profile: ', res);
      },
      error: (err) => {
        // This might be a profile ID instead - let's try getting that, and if it works, redirect to that profile.

        console.debug("lol hi");

        if (err.status != 404) {
          alert(JSON.stringify(err));
          return;
        } else if (isNaN(Number(this.login))) { // can't be a profile ID if it's not a number
          this.router.navigate(['/404']);
          return;
        }

        this.profileService.find(Number(this.login)).subscribe({
          next: (val) => {
            // we got a profile!!
            this.router.navigate(["/profile", val.body?.username]).then(() => {
              this.login = val.body?.username ? val.body.username : null;
              this.ngOnInit();
              return
            });
          },
          error: (err) => {
            // :(
            if (err.status == 404) {
              this.router.navigate(['/404']);
              return;
            }
            alert(JSON.stringify(err));
            this.router.navigate([]);
          }
        });
      },
    });
  }

  getSpotifyID(): string {
    if (this.profile?.spotifyURI == null) {
      return 'null';
    }
    return this.profile?.spotifyURI.split(':').reverse()[0];
  }

  getCreationDate(): string {
    let c = this.profile?.user?.createdDate;
    if (c == null) {
      return 'undefined';
    }
    return new Date(c).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  toggleFollowing() {
    if (this.isSelf || this.profile?.username == undefined) {
      return;
    }

    this.http
      .post(
        this.applicationConfigService.getEndpointFor('/api/follows/' + (this.isFollowing ? 'un' : '') + 'follow/' + this.profile.username),
        null
      )
      .subscribe({
        next: () => {
          this.isFollowing = !this.isFollowing;
        },
        error: err => {
          alert('Failed to (un)follow: ' + JSON.stringify(err));
        },
      });
  }
}
