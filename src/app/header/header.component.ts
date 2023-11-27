import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router,public auth:AuthService){}

  goToHome(){
    this.router.navigate(['home']);
  }
  logout(){
    this.auth.logout();
  }

}
