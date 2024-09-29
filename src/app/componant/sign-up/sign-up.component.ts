import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Role, Users } from '../../models/product/product.module'; // Check if this path is correct
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
  allUsers: Users[] = [];
  sizeOfAllUsers: number = 0;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.usersService.find().subscribe(
      (data) => {
        this.sizeOfAllUsers = data.length;
        console.log('Number of users: ' + this.sizeOfAllUsers);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  validateForm(): boolean {
    const { Fname, Lname, email, password } = this.user;

     const nameRegex = /^[a-zA-Z\s]+$/;
    if (!Fname || !Lname || !nameRegex.test(Fname) || !nameRegex.test(Lname)) {
      console.error('Invalid first or last name');
      return false;
    }

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      console.error('Invalid email format');
      return false;
    }

     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      console.error(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      );
      return false;
    }

     return true;
  }

  addUser(): void {
    if (this.validateForm()) {
      this.user.role = Role.User;
      this.user.id = this.sizeOfAllUsers + 1;

      this.usersService.addUsers(this.user).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during sign-up:', error);
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
