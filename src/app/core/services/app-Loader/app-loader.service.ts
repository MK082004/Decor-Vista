import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppLoaderService {
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  isShowLoader(): void {
    this.loaderSubject.next(true);
  }

  isHideLoader(): void {
    this.loaderSubject.next(false);
  }

  getLoaderState(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }
}
