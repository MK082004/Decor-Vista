import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppLoaderService } from '../core/services/app-Loader/app-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private appLoaderService: AppLoaderService) { }

  status: boolean = false;
  handleToggleSidebar(value: boolean) {
    this.status = value;
  }

  isLoading: boolean = false;
  private loaderSubscription: Subscription;


  ngOnInit(): void {
    this.loaderSubscription = this.appLoaderService.getLoaderState().subscribe(
      (state: boolean) => {
        this.isLoading = state;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }
}
