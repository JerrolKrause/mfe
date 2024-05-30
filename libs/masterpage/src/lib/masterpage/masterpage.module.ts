import { IconsModule } from '$icons';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderComponent } from './header/header.component';
import { MasterpageComponent } from './masterpage.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    IconsModule,
    TooltipModule,
    AccordionModule,
  ],
  declarations: [
    MasterpageComponent,
    HeaderComponent,
    NavComponent,
    SidebarComponent,
  ],
  providers: [ConfirmationService],
  exports: [MasterpageComponent],
})
export class MasterpageModule {}
