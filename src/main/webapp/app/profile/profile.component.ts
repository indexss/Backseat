import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../core/auth/account.service";
import {ProfileService} from "../entities/profile/service/profile.service";
import {ProfileInfo} from "../layouts/profiles/profile-info.model";
import {IProfile} from "../entities/profile/profile.model";
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigService} from "../core/config/application-config.service";
import {IUser} from "../entities/user/user.model";
import {ISpotifyConnection} from "../entities/spotify-connection/spotify-connection.model";

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

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  protected isSelf: boolean;
  private readonly login: string | null;
  protected profile: ModProfile | null = null;
  protected profilePhotoURL: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) {
    this.isSelf = false;
    this.login = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe((acc) => {
      if (acc == null) {
        return;
      }

      if (acc.login == this.login) {
        this.isSelf = true;
      }
    });

    this.http.get<ModProfile>(this.applicationConfigService.getEndpointFor("/api/profiles/byLogin/" + this.login)).subscribe({
      next: (res) => {
        this.profile = res;
        this.http.get<string>(this.applicationConfigService.getEndpointFor("/api/profiles/byLogin/" + this.login + "/profilePhoto")).subscribe({
          next: (v) => {
            console.debug(v);
            this.profilePhotoURL = v;
          }
        });
        console.log(res);
      },
      error: (err) => {
        // TODO(txp271): handle this!
        alert(JSON.stringify(err));
        this.router.navigate([]);
      },
    });
  }

  getSpotifyID(): string {
    if (this.profile?.spotifyURI == null) {
      return "null";
    }
    return this.profile?.spotifyURI.split(":").reverse()[0];
  }

  getCreationDate(): string {
    let c = this.profile?.user?.createdDate;
    if (c == null) {
      return "undefined";
    }
    return new Date(c).toLocaleDateString("en-GB", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
