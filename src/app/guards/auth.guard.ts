import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService,private router:Router){}

  canActivate(): Observable<boolean> | boolean {
    
     //! SI NO ESTA LOGUEADO; SI PUEDES ENTRAR AL LOGIN

    //! CASO: (TRUE)SI ESTOY LOGUEADO --> NO TE DEJO ENTRAR AL LOGIN, MANDAME A LISTADO
    //! CASO: (FALSE)NO ESTOY LOGUEADO --> TE DEJO ENTRAR AL LOGIN


    return ( !this.authService.isLoggedIn() ) ? true : this.redirectPages();

  }
  canLoad(): Observable<boolean> | boolean {
    return true;
  }

  private redirectPages(){
    this.router.navigateByUrl('/pages/characteres');
    return false;
  }
  
}

