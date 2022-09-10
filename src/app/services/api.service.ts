import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string = environment.apiUrl
  constructor(private http: HttpClient) { }


  getCharacters(): Observable<any[]> {
    const url: string = this.baseUrl;

    return this.http.get(url)
      .pipe(
        map((todo: any) => {
          return todo.results
        })
      )
  }

}
