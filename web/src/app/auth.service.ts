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
  // isLoggedIn: Observable<firebase.User>;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth) {
    // this.isLoggedIn = this.afAuth.user;
    this.isLoggedIn = this.afAuth.user.pipe(map((user: firebase.User) => {
      return user ? true : false;
    }));
  }

  login(email, password): Observable<boolean> {
    const self = this;
    this.afAuth.auth.setPersistence('local');
    //return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        })
        // .then(function(userCredential: auth.UserCredential) {
        //   // if (userCredential) {
        //   //   self.isLoggedIn = true;
        //   // }
        // })
      )
      .pipe(map((userCredential: auth.UserCredential) => {
        return userCredential ? true : false;
      }));
  }

  logout(): void {
    //const self = this;
    this.afAuth.auth.signOut();
      // .then(function() {
      //   self.isLoggedIn = false;
      // });
  }
}
