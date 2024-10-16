import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppLoaderService } from '../core/services/app-Loader/app-loader.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLayoutComponent implements OnInit {
  currentYear: number;

  constructor(public loaderService: AppLoaderService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
