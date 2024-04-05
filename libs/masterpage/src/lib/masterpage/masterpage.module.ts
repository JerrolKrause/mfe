import { IconsModule } from '$libs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './header/header.component';
import { MasterpageComponent } from './masterpage.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [CommonModule, RouterModule, SidebarModule, IconsModule],
  declarations: [MasterpageComponent, HeaderComponent, NavComponent],
  providers: [ConfirmationService],
  exports: [MasterpageComponent],
})
export class MasterpageModule {}
