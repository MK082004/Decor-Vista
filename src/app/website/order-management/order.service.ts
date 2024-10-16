import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.baseUrl);
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/cancel/${orderId}`, {});
  }

  updateOrder(order: OrderAddUpdateDeleteModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update`, order);
  }

  startProcessing(orderId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/process/${orderId}`, {});
  }

  shipOrder(order: OrderAddUpdateDeleteModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/ship`, order);
  }

  getOrderDetails(orderId: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(
      `${this.baseUrl}/getOrderDetails?orderId=${orderId}`
    );
  }

  payNow(model: payNowModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/pay`, model);
  }
}

export class payNowModel {
  orderId: number;
  scheme: string;
  host: string;
}

export class OrderModel {
  id: number;                            // Unique identifier for the order
  productName: string;                   // Name of the product
  productId?: number;                    // Identifier for the product (optional)
  count: number;                         // Quantity of the product ordered
  price: number;                         // Price of the product
  applicationUserId?: number;           // ID of the user who placed the order (optional)
  orderDate: Date;                       // Date when the order was placed
  shippedDate?: Date;                    // Date when the order was shipped (optional)
  orderTotal: number;                    // Total amount for the order
  orderStatus: string;                   // Status of the order (e.g., pending, shipped)
  paymentStatus: string;                 // Status of the payment (e.g., paid, unpaid)
  trackingNumber?: string;               // Tracking number for the shipment (optional)
  carrier?: string;                      // Carrier handling the shipment (optional)
  paymentDate?: Date;                    // Date when the payment was made (optional)
  paymentDueDate?: Date;                 // Due date for payment (optional)
  sessionId?: string;                    // Session ID for the order (optional)
  paymentIntentId?: string;              // Payment intent ID for payment processing (optional)
  phoneNumber: string;                   // Customer's phone number
  streetAddress: string;                 // Shipping street address
  city: string;                          // Shipping city
  state: string;                         // Shipping state
  postalCode: string;                    // Shipping postal code
  name: string;                          // Customer's name
}

export interface OrderAddUpdateDeleteModel extends OrderModel {
  createdBy?: number;                    // User ID who created the order (optional)
  createdDate?: Date;                    // Date when the order was created (optional)
  modifiedBy?: number;                   // User ID who last modified the order (optional)
  modifiedDate?: Date;                   // Date when the order was last modified (optional)
}
