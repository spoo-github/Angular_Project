import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
   
  access:boolean= false;
  currentUser$ = authState(this.auth);
  constructor(private auth:Auth,private router:Router) { }

  login(email: string,password: string){
    return from(signInWithEmailAndPassword(this.auth,email,password));
  }

  signUp(name: string,email: string,password: string){
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)).pipe(switchMap(({ user })=>updateProfile(user,{displayName:name})));
  }

  logout(){
    //return from(this.auth.signOut());
    this.router.navigate(['login']);
  }

  isloggedIn():boolean{
    if(this.access == true){
       return true;
    }
    else{
      return false;
    }
  }
}
