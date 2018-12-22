import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    const requiresLogin = next.data.requiresLogin || false;
    if (!requiresLogin) {
      return true;
    } else {
      return this.authService.isLoggedIn.pipe(map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = state.url;
          // Navigate to the login page with extras
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }));
    }
  }
}
