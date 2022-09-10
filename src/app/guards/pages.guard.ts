import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagesGuard implements CanActivate, CanLoad {
  constructor(private authService:AuthService,private router: Router) { }

  canActivate(): Observable<boolean> |boolean {
   
    return ( this.authService.isLoggedIn()  ) ? true :  this.redirectLogin()

  }
  canLoad():  Observable<boolean> |boolean {
    return true;
  }

  private redirectLogin(){
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
