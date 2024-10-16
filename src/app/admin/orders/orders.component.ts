import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Order {
  id: number;
  customerName: string;
  item: string;
  price: number;
  status: string;
}

const ORDER_DATA: Order[] = [
  { id: 1, customerName: 'John Doe', item: 'T-Shirt', price: 25, status: 'Pending' },
  { id: 2, customerName: 'Jane Smith', item: 'Shoes', price: 50, status: 'Pending' },
  { id: 3, customerName: 'Sam Johnson', item: 'Hat', price: 15, status: 'Pending' }
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'customerName', 'item', 'price', 'status', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>(ORDER_DATA);

  constructor() { }

  ngOnInit(): void { }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  acceptOrder(order: Order): void {
    order.status = 'Accepted';
  }

  rejectOrder(order: Order): void {
    order.status = 'Rejected';
  }
}
