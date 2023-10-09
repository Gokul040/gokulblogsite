import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../Services/token-storage.service';
import { DatePipe } from '@angular/common';
import jwtDecode, { JwtPayload } from 'jwt-decode';


export const authGuard: CanActivateFn = (route,
  state) => {

  const storageService = inject(TokenStorageService);
  const router = inject(Router);
  const token = window.sessionStorage.getItem('token');
  // const expiryDate = window.sessionStorage.getItem('Expirydate');


  const decodedToken: JwtPayload = jwtDecode(token!);

  const Detokens = decodedToken.exp;

  // const dates = new Date(Detokens!);
  const timestamp = Detokens;
  const date = new Date(timestamp! * 1000);
  const newDate = new Date()


  if (date >= newDate && token) {
    // Token is still valid, so allow the user to access the route
    return true;
  }
  else {
    // Token has expired, so log out the user
    storageService.logOut();
    sessionStorage.clear();
    router.navigate(['/home'])
    return false;
  }
}




