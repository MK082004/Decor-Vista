import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TitleService } from './core/services/title-Service/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit(): void { }
}
