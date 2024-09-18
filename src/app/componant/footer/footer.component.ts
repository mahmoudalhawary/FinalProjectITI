import { Component } from '@angular/core';
import { ThemeService } from '../../services/mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private themeService: ThemeService) { }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
}
