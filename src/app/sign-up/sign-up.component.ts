import { Component } from '@angular/core';
import { AbstractControl,FormControl,FormGroup,NonNullableFormBuilder,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
export function passwordMatchValidator():ValidatorFn{
  return(control:AbstractControl):ValidationErrors|null =>{
    const password =control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password!== confirmPassword){
      return {
        passwordDontMatch:'true'
    }
    }
    return null
  }
}
export function ValidateEmail(control: AbstractControl) {
  if (!control.value.includes('@gmail.com')) {
    return { invalid: true };
  }
  return null;
}
export function passwordValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasSpecialChar = /[$@$!%*?&]+/.test(value)

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? {passwordStrength:true}: null;
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
   

   signUpForm = this.fb.group({
     name:['',Validators.required],
     email:['',[Validators.email,Validators.required,ValidateEmail]],
    password:['',[Validators.required,passwordValidator()]],
    confirmPassword:['',Validators.required]
    },{validators: passwordMatchValidator()})
 

   constructor(private auth:AuthService,private toast:HotToastService,private router:Router,private fb:NonNullableFormBuilder ){}
   ngOnInit(){}
   
   get name(){
    return this.signUpForm.get('name');
   }
   get email(){
    return this.signUpForm.get('email');
   }
   get password(){
    return this.signUpForm.get('password');
   }
   get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
   }
   submit(){
    const{name,email,password}= this.signUpForm.value;
    if(!this.signUpForm.valid || !name || !email || !password)
    { 
      return;
    }

    this.auth.signUp(name,email,password).pipe(
      this.toast.observe({
        success:'Congrats! You are all signed up',
        loading: 'Signing in',
        error: "Error in signing up , password must be minimum of 6 characters"
      })
    ).subscribe(()=>{
      this.router.navigate(['/home']);
    })
   }
}
