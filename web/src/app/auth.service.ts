import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  isLoggedInObs: Observable<boolean>;
  loggedUser: firebase.User;
  loggedUserObs: Observable<firebase.User>;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth) {
    const self = this;
    this.isLoggedInObs = this.afAuth.authState.pipe(map((user: firebase.User) => {
      self.loggedUser = user;
      self.isLoggedIn = user ? true : false
      return self.isLoggedIn;
    }));
    this.loggedUserObs = this.afAuth.authState;
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
