import { NgModule } from '@angular/core';
import { DesignerRoutingModule } from './designer-routing.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DesignerDashbaordComponent } from './designer-dashbaord/designer-dashbaord.component';
import { SharedModule } from '../shared/shared.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { AppointmentComponent } from './appointment/appointment.component';


@NgModule({
  declarations: [
    PortfolioComponent,
    DesignerDashbaordComponent,
    AppointmentComponent,
    ReviewsComponent
  ],
  imports: [
    SharedModule,
    DesignerRoutingModule
  ]
})
export class DesignerModule { }
