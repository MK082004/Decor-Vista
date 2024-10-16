import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderModel, OrderService } from '../order-management/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: number | null = null;
  orderDetails: OrderModel = new OrderModel();

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    // Retrieve the orderId from the URL
    this.orderId = parseInt(this.route.snapshot.queryParamMap.get('orderId'));

    // Fetch the order details using the orderId
    if (this.orderId) {
      this.orderService.getOrderDetails(this.orderId).subscribe(
        (details) => {
          this.orderDetails = details;
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    }
  }
}
