import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { SharedModule } from '../shared/shared.module';
import { OrderManagementComponent } from './order-management/order-management.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    BookingComponent,
    AboutComponent,
    GalleryComponent,
    ImageGalleryComponent,
    OrderManagementComponent,
    PaymentConfirmationComponent,
    OrderDetailsComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule
  ],
  exports: [
    ImageGalleryComponent,
  ]
})
export class WebsiteModule { }
