import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { NtsDomainStateComponent } from './components/api-state/api-state.component';
import { NtsErrorComponent } from './components/error/error.component';
import { EntityData } from './pipes/entity-data.pipe';
import { EntityIsLoaded } from './pipes/is-loaded.pipe';

const Components = [
  NtsDomainStateComponent,
  NtsErrorComponent,
  EntityData,
  EntityIsLoaded,
];

/**
 * State management tools intended to work with Akita
 */
@NgModule({
  declarations: [Components],
  imports: [CommonModule, AccordionModule, ProgressBarModule, MessageModule],
  exports: [Components],
})
export class StateManagementModule {}
