import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: DialogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.status === 0) {
          errorMessage = 'Internal Server Error, please contact administrator';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.notificationService.showMessage(errorMessage, false);
        return throwError(error);
      })
    );
  }
}
