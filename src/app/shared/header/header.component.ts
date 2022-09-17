import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() pageName : any = '';
  constructor(private router:Router) { }

  public nombreUsuarioLogueado:string = '';

  ngOnInit(): void {
    this.nombreUsuarioLogueado = localStorage.getItem('name')!
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }

}
