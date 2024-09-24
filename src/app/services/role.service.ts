import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  private isAdmin: boolean = false;
  private isUser: boolean = false;

  changeAdminRole(a: boolean): void {
    this.isAdmin = a;
  }
  changeUserRole(u: boolean): void {
    this.isUser = u;
  }

  get isAdminRole(): boolean {
    return this.isAdmin;
  }

  get isUserRole(): boolean {
    return this.isUser;
  }


}
