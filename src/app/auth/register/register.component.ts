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
    private authService:AuthService
  
    ) { }

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

    this.authService.register(name,email,password,1,true)
        .subscribe(result=> {
          // console.log(result);
          if(result===true){
            this.router.navigateByUrl('/pages')
          }else{

             //TODO: mostrar mensaje de error
          //valida los errores (validaciones) desde la base de datos
          
          if(result.msg){
            setTimeout(() => {
              this.mensaje.push(result.msg) ;
            }, 300);
  
            setTimeout(()=>{
              this.mensaje=[];
            },3100)
          }

          if(result.errors?.name){
            console.log("pasoo")
            setTimeout(() => {
              this.mensaje.push(result.errors.name.msg);
            }, 300);
  
            setTimeout(()=>{
              this.mensaje=[];
            },3100)
           }
         if(result.errors?.email){
          console.log("pasoo")
          setTimeout(() => {
            this.mensaje.push(result.errors.email.msg);
          }, 300);

          setTimeout(()=>{
            this.mensaje=[];
          },3100)
         }

         if(result.errors?.password){
          console.log("pasoo")
          setTimeout(() => {
            this.mensaje.push(result.errors.password.msg);
          }, 300);

          setTimeout(()=>{
            this.mensaje=[];
          },3100)
         }
           
            console.log(result)
          }
        })

  }



  fieldIsValid(campo:string){
    return this.myForm.controls[campo].errors
            && this.myForm.controls[campo].touched
  }

}
