import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Role, Users } from '../../models/product/product.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/mode.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  user: Users = {} as Users;
  allusers: Users[] = [];
  sizeOFallusers: number = 0;
  constructor(private router: Router, private usersService: UsersService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.usersService.find().subscribe(data => {

      this.sizeOFallusers = data.length;
      console.log("asize" + this.sizeOFallusers);


    },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

  }

  validateForm(): boolean {
    return !!(this.user.Fname && this.user.Lname && this.user.email && this.user.password && this.user.role);
  }


  addUser() {
    if (this.validateForm()) {
      this.user.role = Role.User;
      this.user.id = (this.sizeOFallusers + 1);
      this.usersService.addUsers(this.user).subscribe(
        response => {
          console.log('User added successfully:', response);
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Error during sign up:', error);
        }
      );
    } else {
      console.error('All fields are required.');
    }
  }
  isDarkMode(): boolean {
    return this.themeService.currentTheme;
  }

}
