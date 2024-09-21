import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-toolbar',
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.css']
})
export class PageToolbarComponent {

  @Input() pageName: string = "";
  currentUrlWithoutRole: string = "";

  constructor(private router: Router) {}

  ngOnChanges(): void {
    this.extractUserRole();
  }

  private extractUserRole(): void {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/').filter(segment => segment.length > 0);
    if (segments.length > 1) {
      this.currentUrlWithoutRole = segments.slice(1).join('/');
    }
  }

}
