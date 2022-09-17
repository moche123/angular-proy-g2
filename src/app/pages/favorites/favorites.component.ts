import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public favorites: any;
  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getFavorites().subscribe( res => {
      this.favorites = res
    } )
  }

  back(){
    this.router.navigateByUrl('/pages')
  }

  public removeFavorite(favorite:any){
    console.log(favorite.IdCharacter);
    this.apiService.deleteFavorite(favorite.IdCharacter, favorite.IdUser).subscribe(resultado=>{
    
      this.apiService.getFavorites().subscribe( res => {
        this.favorites = res
      } )
    })

  }

}
