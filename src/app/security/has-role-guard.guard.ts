import {CanActivateFn } from '@angular/router';



export const HasRoleGuardGuard: CanActivateFn = (route,
  state)=>  {

    
      const userRole = window.sessionStorage.getItem('userRole');

      const isAuthorized = userRole?.includes(route.data['role'])

      if (!isAuthorized) {
        window.alert('you are not authorized');
      }
      return isAuthorized || false;
  }
  



