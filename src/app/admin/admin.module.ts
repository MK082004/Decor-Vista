import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditProductComponent } from './products/dialog/add-product/addEdit-product.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { BlogComponent } from './blog/blog.component';
import { CategoriesComponent } from './categories/categories.component';
@NgModule({
  declarations: [
    ProductsComponent,
    AddEditProductComponent,
    AdminDasboardComponent,
    OrdersComponent,
    UserComponent,
    BlogComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
