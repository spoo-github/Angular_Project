import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const log = inject(AuthService);
  const routes = inject(Router);
  
  if(log.isloggedIn() === true){
    return true;
  }
  else{
    routes.navigate(['/login']);
    return false;
  }
};
