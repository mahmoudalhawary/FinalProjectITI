import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/mode.service';
import { faMoon, faSun  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';

var modee: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, FontAwesomeModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faMoon = faMoon;
  faSun = faSun;
   constructor(private themeService: ThemeService, private roleService: RoleService, private router: Router) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Return current theme mode (dark or light)
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }



  isUser(): boolean {
    return this.roleService.isUserRole;
  }
  isAdmin(): boolean {
    return this.roleService.isAdminRole;
  }





  logout() {
    this.roleService.changeUserRole(false);
    this.roleService.changeUserRole(false);
    this.router.navigate(['/products'])
  }


}
