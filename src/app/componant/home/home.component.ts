import { Component } from '@angular/core';
import { ThemeService } from '../../services/mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private themeService: ThemeService) { }

  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }

}
