import { AppLoaderService } from './../../core/services/app-Loader/app-loader.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit(): void {
    gsap.fromTo('.loader-text', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
  }

}
