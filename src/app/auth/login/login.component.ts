import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  auth!:any;
  mensaje:any=[];

  myForm:FormGroup= this.fb.group({
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

    const {email,password}=this.myForm.value;
    
    this.authService.login(email,password)
    .subscribe(ok=>{
      console.log(ok);
      if(ok === true){
        // localStorage.setItem('token')
        this.router.navigateByUrl('/pages')
      }else{
        //TODO: mostrar mensaje de error
        //valida los errores (validaciones) desde la base de datos
        if(ok.msg){
          setTimeout(() => {
            this.mensaje.push(ok.msg) ;
          }, 300);

          setTimeout(()=>{
            this.mensaje=[];
          },3100)
        }
       if(ok.errors?.email){
        console.log("pasoo")
        setTimeout(() => {
          this.mensaje.push(ok.errors.email.msg);
        }, 300);

        setTimeout(()=>{
          this.mensaje=[];
        },3100)
       }

       if(ok.errors?.password){
        console.log("pasoo")
        setTimeout(() => {
          this.mensaje.push(ok.errors.password.msg);
        }, 300);

        setTimeout(()=>{
          this.mensaje=[];
        },3100)
       }

        //end
        console.log(ok);
      }
      
      
    })
   

  }
  
  fieldIsValidReactive(field:string){
    return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched
  }

  // fieldIsInvalid(field:string){
  //   return this.loginForm.controls[field].errors
  // }
      


}
