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
import {FolderService} from "../entities/folder/service/folder.service";
import {IFolder} from "../entities/folder/folder.model";
import {IReview} from "../entities/review/review.model";
import {ReviewService} from "../entities/review/service/review.service";
import {ITrack} from "../entities/track/track.model";
import {IAlbum} from "../entities/album/album.model";

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

interface ModFolder {
  folderId: number;
  folderName: string;
  imageURL: string;
}

interface ExtendedReview {
  review: ModReview;
  artists: ModArtist[];
}

interface ModReview {
  id: number;
  content: string;
  date: Date | string;
  profile: ModProfile;
  track: ITrack | null;
  album: IAlbum | null;
  rating: number;
}

interface ModArtist {
  name: string;
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
  protected folders: ModFolder[] = [];
  protected reviews: ExtendedReview[] = [];

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

        this.http.get<ModFolder[]>(this.applicationConfigService.getEndpointFor("/api/folders/byProfile/" + this.login)).subscribe({
          next: (res) => {
            console.debug("Folders", res);
            this.folders = res;

            if (this.profile != null && "id" in this.profile) {
              this.http.get<ExtendedReview[]>(this.applicationConfigService.getEndpointFor("/api/reviews/byProfile/" + this.profile.id)).subscribe({
                next: (res) => {
                  console.debug("Reviews", res)
                  this.reviews = res.map((v) => {
                    v.review.date = new Date(v.review.date);
                    return v;
                  }).sort((a: ExtendedReview, b: ExtendedReview): number => {
                    if (a.review.date > b.review.date) {
                      return -1;
                    }
                    if (a.review.date < b.review.date) {
                      return 1;
                    }
                    return 0;
                  }).map((v) => {
                    v.review.date = (<Date>v.review.date).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
                    return v;
                  });

                  console.debug(new Date(this.reviews[0].review.date));
                },
                error: (err) => {
                  alert("Failed to get reviews\n" + JSON.stringify(err));
                }
              });
            } else {
              alert("Failed to get reviews: null ID")
            }

          },
          error: (err) => {
            alert("Get folders " + JSON.stringify(err));
            this.router.navigate([]);
          }
        });

        this.profilePhotoURL = "/api/profiles/byLogin/" + this.profile.username + "/profilePhoto";
      },
      error: (err) => {
        // This might be a profile ID instead - let's try getting that, and if it works, redirect to that profile.

        if (err.status == 401) {
          alert("Please log in first");
          this.router.navigate(["/login"]);
          return;
        }

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
