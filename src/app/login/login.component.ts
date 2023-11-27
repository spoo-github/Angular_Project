import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  access: boolean = false;

  // Define properties for the form fields
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) { }

  submit() {
    if (!this.email || !this.password) {
      return;
    }

    this.authService.login(this.email, this.password).pipe(
      this.toast.observe({
        success: 'Logged In Successfully',
        loading: 'Logging in...',
        error: 'Error in logging in'
      })
    ).subscribe(() => {
      this.authService.access = true;
      this.router.navigate(['/home']);
    });


  }
}
