import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    BookingComponent,
    AboutComponent,
    GalleryComponent,
    ImageGalleryComponent,
    SignupComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule
  ],
  exports: [
    ImageGalleryComponent
  ]
})
export class WebsiteModule { }
