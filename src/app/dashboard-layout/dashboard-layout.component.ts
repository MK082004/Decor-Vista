import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from '../core/services/app-Loader/app-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  status: boolean = false;

  constructor(public loaderService: AppLoaderService) {}

  handleToggleSidebar(value: boolean) {
    this.status = value;
  }

  ngOnInit(): void {}

}
