import { NgModule } from '@angular/core';
// animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// browers and tab title
import { BrowserModule, Title } from '@angular/platform-browser';

// whole app rounting
import { AppRoutingModule } from './app-routing.module';

// for interceptors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// for loader interceptors
import { LoaderInterceptor } from './core/interceptors/loader-Interceptor/loader.interceptor';
// for error interceptors
import { ErrorInterceptor } from './core/interceptors/error-interceptor/error.interceptor';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

// Services
import { AppLoaderService } from './core/services/app-Loader/app-loader.service';
import { TitleService } from './core/services/title-Service/title.service';
import { FeaturedLayoutComponent } from './featured-layout/featured-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ConfirmationDialogComponent } from './core/services/dialog/confirmation-dialog/confirmation-dialog.component';

// for material core
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    FeaturedLayoutComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    ConfirmationDialogComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    TitleService,
    Title,
    AppLoaderService,
    AppLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
