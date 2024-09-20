import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './featured-layout/featured.component';
import { DashboardComponent } from './dashboard-layout/dashboard.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  {
    path: '',
    component: FeaturedComponent,
    loadChildren: () =>
      import('./website/website.module').then(m => m.WebsiteModule),
  },
  {
    path: 'admin',
    component: DashboardComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'designer',
    component: DashboardComponent,
    loadChildren: () =>
      import('./designer/designer.module').then((m) => m.DesignerModule),
  },
  {
    path: 'user',
    component: DashboardComponent,
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
