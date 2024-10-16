import { Component, OnInit } from '@angular/core';
import { OrderModel, OrderService, OrderAddUpdateDeleteModel } from '../order-management/order.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
    orders: OrderModel[] = [];

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.fetchOrders();
    }

    fetchOrders(): void {
        this.orderService.getAllOrders().subscribe(
            (data) => {
                this.orders = data;
            },
            (error) => {
                console.error('Error fetching orders', error);
            }
        );
    }

    cancelOrder(orderId: number): void {
        this.orderService.cancelOrder(orderId).subscribe(() => {
            this.fetchOrders(); // Refresh the order list
            alert('Order cancelled successfully');
        }, error => {
            alert('Error cancelling order');
        });
    }

    updateOrder(order: OrderAddUpdateDeleteModel): void {
        this.orderService.updateOrder(order).subscribe(() => {
            this.fetchOrders(); // Refresh the order list
            alert('Order updated successfully');
        }, error => {
            alert('Error updating order');
        });
    }

    startProcessing(orderId: number): void {
        this.orderService.startProcessing(orderId).subscribe(() => {
            this.fetchOrders(); // Refresh the order list
            alert('Order processing started successfully');
        }, error => {
            alert('Error starting order processing');
        });
    }

    shipOrder(order: OrderAddUpdateDeleteModel): void {
        this.orderService.shipOrder(order).subscribe(() => {
            this.fetchOrders(); // Refresh the order list
            alert('Order shipped successfully');
        }, error => {
            alert('Error shipping order');
        });
    }
}
