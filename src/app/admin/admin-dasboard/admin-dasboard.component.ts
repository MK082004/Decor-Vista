import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  orders: number = 120;
  revenue: number = 25000;
  sales: number = 200;

}
