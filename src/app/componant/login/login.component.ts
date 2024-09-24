import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/product/product.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/mode.service';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, RouterLink, FormsModule, RouterModule],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    user: Users = {} as Users;
    constructor(private router: Router, private userService: UsersService, private themeService: ThemeService, private roleService: RoleService) { }
    ngonit() {

    }
    validateForm(): boolean {
        return !!(this.user.email && this.user.password);
    }

    login() {
        if (!this.validateForm()) {
            console.error("Please fill all the fields.");
            return;
        }
        this.userService.find().subscribe(users => {
            const foundUser = users.find(user => {
                this.user.role = user.role;
                this.user.id = user.id;
                return user.email === this.user.email && user.password === this.user.password
            });

            if (foundUser) {
                if (this.user.role === 'Admin') {

                    this.roleService.changeAdminRole(true);
                    this.router.navigate(['/dashboard', this.user.id]);
                }
                else {
                    this.roleService.changeUserRole(true);
                    this.roleService.changeuserId(this.user.id);
 
                    this.router.navigate(['/products', this.user.id]);
                }
            } else {
                console.error("Invalid username or password");
            }
        }, error => {
            console.error("Error fetching users: ", error);
        });
    }
    isDarkMode(): boolean {
        return this.themeService.currentTheme;
    }
}
