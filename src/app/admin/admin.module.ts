import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditProductComponent } from './products/dialog/add-product/addEdit-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { AddEditCategoryComponent } from './categories/dialog/add-edit-category/add-edit-category.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AddEditProductComponent,
    CategoriesComponent,
    AdminDasboardComponent,
    AddEditCategoryComponent,
    OrdersComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
