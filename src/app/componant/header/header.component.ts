import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/mode.service';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
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
export class HeaderComponent implements OnInit {
  faMoon = faMoon;
  faSun = faSun;
  // userId?: number;
  constructor(private themeService: ThemeService, private route: ActivatedRoute,
    private roleService: RoleService, private router: Router) { }
  ngOnInit(): void {
    // this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    // this.userId = this.roleService.getUserId;
    // console.log("userIduserIduserId  " + this.userId)
  }




  nav(string: string, num?: number): void {

    console.log("userIduserIduserId  " + num)
    if (num) {
      this.router.navigate([`/${string}`, num])
    } else {
      this.router.navigate([`/${string}`])
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }


  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }
  userID(): number {
    return this.roleService.getUserId
  }
  adminID(): number {
    // console.log("login" + this.roleService.getAdminId);
    return this.roleService.getAdminId

  }



  isUser(): boolean {
    // console.log("login user .............." + this.roleService.isUserRole);

    return this.roleService.isUserRole;
  }
  isAdmin(): boolean {

    // test is adimn
    // console.log("login admin  .............." + this.roleService.isAdminRole);

    return this.roleService.isAdminRole;


  }





  logout() {
    this.roleService.changeUserRole(false);
    this.roleService.changeUserRole(false);
    this.roleService.changeAdminId(-1);
    this.roleService.changeuserId(-1);
    this.router.navigate(['/products'])
  }


}
