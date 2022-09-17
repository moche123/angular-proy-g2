import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl:string = environment.apiUrl

  private baseUrl:string = environment.baseUrl
  constructor(private http: HttpClient) { }


  getCharacters(): Observable<any[]> {
    const url: string = this.apiUrl;

    return this.http.get(url)
      .pipe(
        map((todo: any) => {
          return todo.results
        })
      )
  }


  addFavorite(body: any): Observable<any> {
    const url = `${this.baseUrl}/favorite/newFavorite`;


    console.log(body)

    return this.http.post<any>(url, body)
      .pipe(
     
        map(resp => resp.ok),
        catchError(err => {
          alert('Personaje ya está en favoritos')
          return of(err.error)
        })
      )
  }

  getFavorites(): Observable<any[]> {
    const url = `${this.baseUrl}/favorite/${localStorage.getItem('userId')}`;

    return this.http.get(url)
      .pipe(
        map((todo: any) => {
          return todo.favoritos
        })
      )
  }

  deleteFavorite(IdCharacter:any,IdUser:any): Observable<any> {

    const url = `${this.baseUrl}/favorite/deleteFavorite`;
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { IdCharacter,IdUser }, };
    // const headers = new HttpHeaders().set(IdCharacter.toString(),IdUser)
    
    console.log(options)
    return this.http.delete<any>(url,options)
      
      
  }

}
