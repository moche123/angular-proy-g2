import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_TOKEN: string = 'token' //! KEY VALUE IN LOCALSTORAGE

  private USER_ID: string = 'userId';

  private NAME: string = 'name'
 private baseUrl:string = environment.baseUrl

  constructor(private http: HttpClient) {

  }



  public login(email:string, password:string){
    const url   = `${this.baseUrl}/auth/`;
    const body  = {email,password};

    return this.http.post<any>(url,body)
    .pipe(
      tap(({ok,token,uid,name}) =>{
        // console.log(resp);
        if(ok){
          localStorage.setItem(this.STORAGE_TOKEN,token!)
          localStorage.setItem(this.USER_ID,uid!)
          localStorage.setItem(this.NAME,name!)
        }else{
          localStorage.clear();
        }
      } ),
      map(resp => resp.ok),
      catchError(err=>{

        return  of(err.error)
      })
    )
  }


  public register(name:string,email:string,password:string,rol:number,estado:boolean){

    const url = `${this.baseUrl}/auth/new`;
    const body = {name,email,password,rol,estado};
    
    return this.http.post<any>(url,body)
            .pipe(
              tap(({ok,token,uid}) =>{
                // console.log(resp,'Servicio registro');

                if(ok){
                  localStorage.setItem(this.STORAGE_TOKEN,token!)
                  localStorage.setItem(this.USER_ID,uid!)
                  localStorage.setItem(this.NAME,name!)
                  
                }else{
                  localStorage.clear();
                }
              }),
              map(result=>{
                return result.ok
              }),
              catchError(err=>{
                return of(err.error)
              })
            
            ) 

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
