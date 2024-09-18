import { Component } from '@angular/core';
import { ThemeService } from '../../services/mode.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReact, faGitlab, faVuejs,faNode, faAngular, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private themeService: ThemeService) { }

  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }

  faReact = faReact;
  faGitlab = faGitlab;
  faVuejs = faVuejs;
  faNode = faNode;
  faAngular = faAngular;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
}
