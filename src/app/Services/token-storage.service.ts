import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const Token_Key = 'token';
const User_key = 'userName'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public categoryPassId: any;

  constructor(private router: Router) { }

  logOut() {
    window.sessionStorage.clear();
  }
  getTokenExpiryDate(token: string): Date | null {
    try {
      const decodedToken = token as unknown as { exp: number };
      const expiryDate = new Date(0);
      expiryDate.setUTCSeconds(decodedToken.exp);
      return expiryDate;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(Token_Key);
    window.sessionStorage.setItem(Token_Key, token);
  }
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem('RefreshToken');
    window.sessionStorage.setItem('RefreshToken', token);
  }
  public saveTokens(data: any) {
    window.sessionStorage.setItem(Token_Key, data.token);
    window.sessionStorage.setItem('RefreshToken', data.refreshToken);
  }

  public getRefreshToken() {
    return window.sessionStorage.getItem('RefreshToken');
  }

  public getExpiryDate() {
    return window.sessionStorage.getItem('ExpiryDate')
  }
  public setExpiryDate(data: any) {
    return window.sessionStorage.setItem('ExpiryDate', data)
  }


  public getToken() {
    return window.sessionStorage.getItem(Token_Key);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(User_key);
    window.sessionStorage.setItem(User_key, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(User_key);

    return user ? JSON.parse(user) : [];
  }
  public saveEmail(email: string): void {
    window.sessionStorage.removeItem('email');
    window.sessionStorage.setItem('email', email);
  }

  setCategoryId(id: any) {
    sessionStorage.removeItem('categoryId');
    sessionStorage.setItem('categoryId', id);
  }
  setBlogId(id: any) {
    sessionStorage.removeItem('blogId');
    sessionStorage.setItem('blogId', id);
  }


}
