import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from '../core/services/app-Loader/app-loader.service';
@Component({
  selector: 'app-featured-layout',
  templateUrl: './featured-layout.component.html',
  styleUrls: ['./featured-layout.component.css'],
})
export class FeaturedLayoutComponent implements OnInit {

  constructor(public loaderService: AppLoaderService) {}

  ngOnInit(): void {}

}
