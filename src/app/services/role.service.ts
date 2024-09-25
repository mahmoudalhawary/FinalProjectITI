import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  private isAdmin: boolean = false;
  private isUser: boolean = false;
  UserID?: number | any;
  AdminId?: number | any;

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

  changeuserId(a: number): void {
    this.UserID = a;
  }
  get getUserId(): number | any {
    if (this.UserID < 0) {
      return null;
    } else {

      return this.UserID;
    }
  }
  changeAdminId(a: number): void {
    this.UserID = a;
  }
  get getAdminId(): number | any {

    if (this.AdminId < 0) {
      return null;
    } else {

      return this.AdminId;

    }
  }


}
