import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_TOKEN: string = 'token' //! KEY VALUE IN LOCALSTORAGE

  private USER_ID: string = 'userId';

  private NAME: string = 'name'


  constructor(private http: HttpClient) {

  }

  public isLoggedIn() : boolean{
    
    try{
      const localStorageValue = localStorage.getItem( this.STORAGE_TOKEN)
      return localStorageValue ? true : false

    }catch(err){
      return false
    }
  }
}
