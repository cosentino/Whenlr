import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Observable<boolean>;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth) {
    this.isLoggedIn = this.afAuth.authState.pipe(map((user: firebase.User) => {
      return user ? true : false;
    }));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
