import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { UserMenuModel } from '../../models/userMenu.model';
import { AuthService } from '../../services/auth/auth/auth.service';

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

  verifyActivation(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(res => {
        const currentUrl = state.url.split('?')[0];
        const authTrue = localStorage.getItem('AuthTrue') === 'true';

        // Check if the current URL is part of the auth module
        const isAuthModuleRoute = currentUrl.startsWith('/auth');

        if (!res) {
          // User is not logged in
          if (isAuthModuleRoute) {
            if (currentUrl === '/auth/forgotCode' && !authTrue) {
              return this.router.parseUrl('/auth');
            }
            return true;
          } else {
            return this.router.parseUrl('/auth');
          }
        } else {
          // User is logged in
          if (isAuthModuleRoute) {
            if (currentUrl === '/auth/forgotCode' && !authTrue) {
              return this.router.parseUrl('/auth');
            }
            return this.router.parseUrl(`/${res.userRole}`);
          } else {

            if (res.userPermissions && typeof res.userPermissions === 'string') {
              try {
                res.userPermissions = JSON.parse(res.userPermissions);
              } catch (error) {
                console.error('Failed to parse userPermissions:', error);
                return this.router.parseUrl('/auth');
              }
            }

            if (Array.isArray(res.userPermissions)) {
              const urlPermissions: string[] = [];
              console.log(res.userPermissions);

              res.userPermissions.forEach((menu: UserMenuModel) => {
                if (menu.MenuUrl) {
                  urlPermissions.push(menu.MenuUrl);
                }
                menu.SubMenus.forEach(subMenu => {
                  if (subMenu.SubMenuUrl) {
                    urlPermissions.push(subMenu.SubMenuUrl);
                  }
                });
              });
              if (urlPermissions.includes(currentUrl)) {
                return true;
              } else {
                return this.router.parseUrl('/auth');
              }
            } else {
              return this.router.parseUrl('/auth');
            }
          }
        }
      })
    );
  }

}
