import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public authService: AuthService, public router: Router) {}

  signInSuccessCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // Get the redirect URL from our auth service
    // If no redirect has been set, use the default
    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

    // Redirect the user
    this.router.navigate([redirect]);
  }

  signInErrorCallback(errorData: FirebaseUISignInFailure) {}

  signOut() {
    this.authService.signOut();
  }


}
