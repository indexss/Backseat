import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VERSION } from 'app/app.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faPhotoFilm, faSquareXmark, faFolder, faFolderBlank } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faCompass = faCompass;
  faFolder = faFolder;
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  isDarkModeEnabled = false;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleDarkMode(): void {
    this.isDarkModeEnabled = !this.isDarkModeEnabled;
    const body = document.body;
    const head = document.getElementsByTagName('head')[0];
    const linkId = 'dark-theme-style';
    const existingLink = document.getElementById(linkId) as HTMLLinkElement | null;

    if (this.isDarkModeEnabled) {
      if (!existingLink) {
        const cssLink = document.createElement('link');
        cssLink.id = linkId;
        cssLink.rel = 'stylesheet';
        cssLink.href = 'content/css/dark.css'; // Use the compiled CSS path
        head.appendChild(cssLink);
      }
    } else {
      if (existingLink) {
        existingLink.parentNode?.removeChild(existingLink);
      }
    }

    // Re-trigger layout to force style re-calculation
    void body.offsetWidth;
  }

  protected readonly faPhotoFilm = faPhotoFilm;
  protected readonly faSquareXmark = faSquareXmark;
}
