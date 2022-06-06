import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './LoginService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate, CanActivateChild  {

  constructor(public loginService: LoginServiceService, public router: Router) { }
  canActivate(): boolean {
    if (!this.loginService.getUserStorage()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.loginService.getUserStorage()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
