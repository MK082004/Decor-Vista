import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './featured/header/header.component';
import { FooterComponent } from './featured/footer/footer.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
// import { MaterialModule } from './material.module';

// Components

// Featured Components

// Pipes
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    AppLoaderComponent
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
    HeaderComponent,
    AppLoaderComponent
  ]
})
export class SharedModule { }
