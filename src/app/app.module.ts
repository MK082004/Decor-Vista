import { NgModule } from '@angular/core';
// animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// browers and tab title
import { BrowserModule, Title } from '@angular/platform-browser';

// whole app rounting
import { AppRoutingModule } from './app-routing.module';

// for loader interceptor
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader-Interceptor/loader.interceptor';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

// Services
import { AppLoaderService } from './core/services/app-Loader/app-loader.service';
import { TitleService } from './core/services/title-Service/title.service';
import { FeaturedComponent } from './featured-layout/featured.component';
import { DashboardComponent } from './dashboard-layout/dashboard.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ConfirmationDialogComponent } from './core/services/dialog/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturedComponent,
    DashboardComponent,
    PagenotfoundComponent,
    AuthLayoutComponent,
    ConfirmationDialogComponent
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
