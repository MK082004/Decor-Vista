import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './featured/header/header.component';
import { FooterComponent } from './featured/footer/footer.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard.component';
import { CapitalizePipe } from '../core/pipes/capitalize.pipe';
import { PageToolbarComponent } from './page-toolbar/page-toolbar.component';
// import { MaterialModule } from './material.module';

// Components

// Featured Components

// Pipes
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    AppLoaderComponent,
    CapitalizePipe,
    PageToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    // Export shared modules and components
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    AppLoaderComponent,
    CapitalizePipe,
    PageToolbarComponent
  ]
})
export class SharedModule { }
