import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/Person.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.css']
})
export class CharacteresComponent implements OnInit {

  public characters : Person[] = []

  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe( (res:Person[]) => {
      this.characters = res;
    })
  }

  addFavorite(person:Person){
   
    let body = {
      IdCharacter: person.id,
      IdUser: localStorage.getItem('userId'),
      nameCharacter: person.name,
      caracterUrlImagen: person.image,
      token: localStorage.getItem('token')
    }

    //! SE ENVIA A BD PARA QUE SE GUARDE
    this.apiService.addFavorite(body).subscribe(ok=>{
      console.log(ok, ' Todo está ok')
      if(ok.ok != false){

        this.router.navigateByUrl('/pages/favorites')
      }
    })



  }



}
