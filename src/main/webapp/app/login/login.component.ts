import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../core/config/application-config.service";
import {ProfileService} from "../layouts/profiles/profile.service";
import {IProfile} from "../entities/profile/profile.model";
import {StoreResultResponse} from "../oauth/inbound/inbound.component";

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;

  authenticationError = false;

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router, private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    this.accountService.identity().subscribe(() => {
      this.checkSpotifyConnectionStatus();
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  login(): void {
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authenticationError = false;
        this.checkSpotifyConnectionStatus();
        if (!this.router.getCurrentNavigation()) {
          // There were no routing during login (eg from navigationToStoredUrl)
          this.router.navigate(['']);
        }
      },
      error: () => (this.authenticationError = true),
    });
  }

  checkSpotifyConnectionStatus(): void {
    this.http.get<IProfile>(this.applicationConfigService.getEndpointFor('api/profiles/mine')).subscribe({
      next: (resp: IProfile) => {
        console.debug("resp.spotifyURI === null =", resp.spotifyConnection === null);
        if (resp.spotifyConnection === null) {
          this.router.navigateByUrl("/oauth/outbound").then(r => {});
        }
      },
    });
  }
}
