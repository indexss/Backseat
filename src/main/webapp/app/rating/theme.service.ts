import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {}

  isDarkMode(): boolean {
    return document.body.getAttribute('data-theme') === 'dark';
  }

  toggleTheme() {
    if (this.isDarkMode()) {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem(this.themeKey, 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem(this.themeKey, 'dark');
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  }
}
