import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth/auth.service';
import { Role } from '../../enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  previousUrl: string;

  constructor(private authService: AuthService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.verifyActivation(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.verifyActivation(route, state);
  }

  verifyActivation(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map((res) => {
        const currentUrl = state.url.split('?')[0];  // Current route URL

        if (!res || !res.userRole) {
          // Redirect to login if the user is not authenticated
          if (currentUrl !== '/signin' && currentUrl !== '/signup') {
            return this.router.createUrlTree(['/signin']);
          }
          return true;  // Allow access to sign-in or sign-up pages
        } else {
          // Check the role and navigate accordingly
          switch (res.userRole) {
            case Role.admin:
              if (currentUrl.startsWith('/admin')) {
                return true;  // Allow access to admin pages
              }
              return this.router.createUrlTree(['/admin']);  // Redirect to admin page
            case Role.designer:
              if (currentUrl.startsWith('/designer')) {
                return true;  // Allow access to designer pages
              }
              return this.router.createUrlTree(['/designer']);  // Redirect to designer page
            default:
              return this.router.createUrlTree(['/home']);  // Default redirect
          }
        }
      })
    );
  }

}
