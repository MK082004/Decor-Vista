import { AuthService } from 'src/app/core/services/auth/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DialogService } from '../../services/dialog/dialog.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private athService: AuthService,
    private notificationService: DialogService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.athService.getCurrentUser().subscribe((res) => {
      if (res && res.token) {
        const decodeToken: string = this.athService.jwtDecodeToken(res.token);
        if (this.athService.jwtTokenExpireationChecker(decodeToken)) {
          this.athService.logout();
          this.notificationService.showMessage("Session Expired - Login To Continue", false);
        }
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.token}`,
          },
        });
      }
    });
    return next.handle(request);
  }

}
