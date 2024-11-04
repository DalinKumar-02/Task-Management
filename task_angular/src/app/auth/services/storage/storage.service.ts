import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : null;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() ===null)
      return false;
    const role : string= this.getUserRole();
    return role === "ADMIN";
  }

  static isEmployeeLoggedIn(): boolean {
    if (this.getToken() ===null)
      return false;
    const role : string= this.getUserRole();
    return role === "EMPLOYEE";
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : null;
  }

  static hasToken(): boolean {
    if (this.getToken() === null)
      return false;
    return true;
  }

  static signout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
