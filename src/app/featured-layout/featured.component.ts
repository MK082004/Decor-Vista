import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from '../core/services/app-Loader/app-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  isLoading: boolean = false;
  private loaderSubscription: Subscription;

  constructor(private appLoaderService: AppLoaderService) { }

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
