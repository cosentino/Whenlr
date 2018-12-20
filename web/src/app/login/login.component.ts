import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(new Date())
  });

  message: string;

  constructor(public authService: AuthService, public router: Router) {
    //this.setMessage();
  }

  // setMessage() {
  //   this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  // }

  onSubmitLogin() {
    this.message = 'Trying to log in ...';

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((succesfullyLoggedIn) => {
        //this.setMessage();
        if (succesfullyLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

          // Redirect the user
          this.router.navigate([redirect]);
        }
      });
  }

  logout() {
    this.authService.logout();
    //this.setMessage();
  }

}
