import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoaderService } from '../../services/app-Loader/app-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: AppLoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isShowLoader();
    return next.handle(req).pipe(
      tap({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loaderService.isHideLoader();
        }
      })
    );
  }
}
