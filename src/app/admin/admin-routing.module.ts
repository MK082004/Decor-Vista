import { UserComponent } from './user/user.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { OrdersComponent } from './orders/orders.component';
import { BlogComponent } from './blog/blog.component';
import { AddEditCategoryComponent } from './categories/dialog/add-edit-category/add-edit-category.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDasboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UserComponent },
  { path: 'blogs', component: BlogComponent },
  {
    path: 'categories',
    loadChildren: () =>
    import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
