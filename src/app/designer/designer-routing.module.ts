import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerDashbaordComponent } from './designer-dashbaord/designer-dashbaord.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DesignerDashbaordComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: 'reviews', component: ReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
