// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

// Dashboard Components
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard.component';
import { DashboardFooterComponent } from './dashboard/dashboard-footer/dashboard-footer.component';
import { PageToolbarComponent } from './page-toolbar/page-toolbar.component';

// Featured Components
import { HeaderComponent } from './featured/header/header.component';
import { FooterComponent } from './featured/footer/footer.component';

// Genric Components
import { AutoCompleteGenericComponent } from '../core/controls/auto-complete-generic/auto-complete-generic.component';

// Loader Components
import { AppLoaderComponent } from './app-loader/main-loader/app-loader.component';
import { AppLoaderProgressBarComponent } from './app-loader/app-loader-progress-bar/app-loader-progress-bar.component';

// Pipes
import { CapitalizePipe } from '../core/pipes/capitalize.pipe';
import { FirstLetterPipe } from '../core/pipes/first-letter.pipe';

// Directives
import { PreventSpaceDirective } from '../core/directives/prevent-space.directive';
import { PreventCopyPasteDirective } from '../core/directives/prevent-copy-paste.directive';
import { NumericDirective } from '../core/directives/numeric.directive';
import { OtpInputDirective } from '../core/directives/otp-input.directive';
import { MinMaxValueDirective } from '../core/directives/min-max-value.directive';
import { DynamicTableComponent } from './dynamic-components/Grids/basic-level/dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    AppLoaderComponent,
    AppLoaderProgressBarComponent,
    PageToolbarComponent,
    AutoCompleteGenericComponent,
    // Pipes
    CapitalizePipe,
    FirstLetterPipe,
    // Directives
    PreventSpaceDirective,
    PreventCopyPasteDirective,
    NumericDirective,
    OtpInputDirective,
    MinMaxValueDirective,
    DynamicTableComponent
  ],
  imports: [
    // Modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    // Export shared modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // Export shared components
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    AppLoaderComponent,
    AppLoaderProgressBarComponent,
    PageToolbarComponent,
    AutoCompleteGenericComponent,
    DashboardFooterComponent,
    DynamicTableComponent,
    // Export shared pipes
    CapitalizePipe,
    FirstLetterPipe,
    // Export shared Directives
    PreventSpaceDirective,
    PreventCopyPasteDirective,
    NumericDirective,
    OtpInputDirective,
    MinMaxValueDirective
  ]
})
export class SharedModule { }
