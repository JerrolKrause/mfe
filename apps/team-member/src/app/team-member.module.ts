import { FormsLibModule } from '$forms';
import { MasterpageModule } from '$masterpage';
import { QuoteCalculatorModule } from '$quote-calculator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { TeamMemberComponent } from './team-member.component';
import { appRoutes } from './team-member.routes';
import { HomeComponent } from './routes/home/home.component';

@NgModule({
  declarations: [TeamMemberComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsLibModule,
    MasterpageModule,
    QuoteCalculatorModule,
    CardModule,
    SliderModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [TeamMemberComponent],
})
export class TeamMemberModule {}
