import { AuthGuard } from './core/auth-guard/canActivate/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedLayoutComponent } from './featured-layout/featured-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: FeaturedLayoutComponent,
    loadChildren: () =>
      import('./website/website.module').then(m => m.WebsiteModule),
  },
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'designer',
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('./designer/designer.module').then((m) => m.DesignerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component : AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      canActivate: [AuthGuard],
  },
  { path: '**', component: PagenotfoundComponent },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
