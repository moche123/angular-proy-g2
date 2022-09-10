import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  auth!:any;
  mensaje:any=[];

  myForm:FormGroup= this.fb.group({
    name: ['usuario',[Validators.required,Validators.minLength(6)]],
    email:['usuario2@usuario.com',[Validators.required,Validators.email]],
    password:['123456',[Validators.required,Validators.minLength(6)] ]
  })

 
  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
  }



  login(){

    // this.authService.validarToken()
    //   .subscribe(resp => console.log(resp))
    
    const {email,password}=this.myForm.value;

    console.log(email,password)

  }
  
  registarUsuario(){
    
    
    const {name,email,password} = this.myForm.value;



   
    // console.log(this.myForm.valid);
    // console.log(this.myForm.value);
  }



  fieldIsValid(campo:string){
    return this.myForm.controls[campo].errors
            && this.myForm.controls[campo].touched
  }

}
