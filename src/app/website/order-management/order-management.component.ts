import { Component, OnInit } from '@angular/core';
import { OrderService, payNowModel } from './order.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  async payNow(orderId: number) {
    const stripe = await loadStripe('pk_test_51Q5smBP9BUwemjoqDiHAoD8INTDtWCKYPGiD5DsNdKSlYXru1G7HwkGKTI3iEzYlsrbTzJ6MUnSPjr6oQPro7tJs00aNDG8hkv');
    const scheme = window.location.protocol;
    const host = window.location.host;

    let model: payNowModel = {
      orderId: orderId,
      scheme: scheme,
      host: host
    }

    this.orderService.payNow(model).subscribe((session) => {
      console.log(session);
      stripe?.redirectToCheckout({ sessionId: session.id });
    });
  }
}
