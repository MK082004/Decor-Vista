import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppLoaderService } from '../../services/app-Loader/app-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: AppLoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip loader for specific Api Urls
    const skipUrls = [
      'Category/getCategories',
    ];

    if (skipUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    this.loaderService.isShowLoader();

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.isHideLoader();
      })
    );
  }
}
