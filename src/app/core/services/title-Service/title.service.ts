import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private router: Router, private titleService: Title) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.split('?')[0])
    ).subscribe(url => {
      const formattedTitle = this.formatUrlForTitle(url);
      this.titleService.setTitle(formattedTitle);
    });
  }

  private formatUrlForTitle(url: string): string {
    const segments = url.split('/').filter(segment => segment && !this.isToken(segment));
    if (segments.length === 0) {
      return 'Decor Vista - Home';
    }
    const titleSegments = segments.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
    return 'Decor Vista - ' + titleSegments.join(' / ');
  }

  private isToken(segment: string): boolean {
    return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(segment) || segment.length === 8;
  }
}
