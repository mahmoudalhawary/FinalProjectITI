// src/app/theme.service.ts
import { Injectable } from '@angular/core';

export var isDarkMode: boolean = false;
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

   private isDarkMode: boolean = false;

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  get currentTheme(): boolean {
    return this.isDarkMode;
  }
}
