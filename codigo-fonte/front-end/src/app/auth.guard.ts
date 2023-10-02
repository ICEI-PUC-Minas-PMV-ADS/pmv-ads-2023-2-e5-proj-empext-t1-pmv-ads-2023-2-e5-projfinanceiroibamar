import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let autheticated = inject(AuthService).isAutheticated();
  if (autheticated){
    return true;
  }
  else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
