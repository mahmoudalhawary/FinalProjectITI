import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
 import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/mode.service';
 import { faMoon, faSun   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 
var modee: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule,FontAwesomeModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Return current theme mode (dark or light)
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
  faMoon = faMoon;
  faSun = faSun;
 
  
}
