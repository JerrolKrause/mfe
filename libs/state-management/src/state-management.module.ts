import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { DomainStateComponent } from './components/api-state/api-state.component';
import { ErrorComponent } from './components/error/error.component';

const Components = [DomainStateComponent, ErrorComponent];

/**
 * State management tools intended to work with Akita
 */
@NgModule({
  declarations: [Components],
  imports: [CommonModule, AccordionModule, ProgressBarModule, MessageModule],
  exports: [Components],
})
export class StateManagementModule {}
