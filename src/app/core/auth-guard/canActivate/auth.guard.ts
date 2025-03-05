import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { UserMenuModel } from '../../models/userMenu.model';
import { AuthService } from '../../services/auth/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private previousUrl: string;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.previousUrl = event.url;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    return this.checkAccess(route, state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    return this.checkAccess(route, state);
  }

  private checkAccess(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const currentUrl = state.url.split('?')[0];
    const isAuthModuleRoute = currentUrl.startsWith('/auth');
    const encryptedParamTokenValue = route.params['tokenValue'];

    return this.authService.getCurrentUserPermissions().pipe(
      take(1),
      map((permissions) => {
        const userPermissions = permissions ?? [];
        return this.handlePermissions(userPermissions, encryptedParamTokenValue, currentUrl, isAuthModuleRoute)
      })
    );
  }

  private handlePermissions(
    permissions: UserMenuModel[],
    encryptedParamTokenValue: string,
    currentUrl: string,
    isAuthModuleRoute: boolean
  ): boolean | UrlTree {
    if (this.previousUrl !== undefined || this.previousUrl !== '/auth') {
      if (encryptedParamTokenValue) {
        return this.hasValidAccess(encryptedParamTokenValue) ? true : this.router.parseUrl(this.previousUrl);
      }
      if (permissions.length > 0 ) {
        const extractedPermissions = this.extractUrlPermissions(permissions);
        return extractedPermissions.includes(currentUrl) ? true : this.router.parseUrl(this.previousUrl);
      }
      else {
        return isAuthModuleRoute ? true : this.router.parseUrl(this.previousUrl);
      }
    }
    else {
      return this.router.parseUrl('/not-found');
    }
  }

  private hasValidAccess(encryptedParamTokenValue: string): boolean {
    if (!encryptedParamTokenValue) return true;
    const decryptedToken = this.authService.jwtDecodeToken<string>(encryptedParamTokenValue);
    return (decryptedToken && this.authService.isValidJwt(encryptedParamTokenValue) && !this.authService.jwtTokenExpireationChecker(decryptedToken));
  }

  private extractUrlPermissions(permissions: UserMenuModel[]): string[] {
    if (Array.isArray(permissions)) {
      return permissions.reduce<string[]>((acc, menu: UserMenuModel) => {
        if (menu.MenuUrl) acc.push(menu.MenuUrl);
        menu.SubMenus.forEach((subMenu) => {
          if (subMenu.SubMenuUrl) acc.push(subMenu.SubMenuUrl);
        });
        return acc;
      }, []);
    }

    return [];
  }
}
