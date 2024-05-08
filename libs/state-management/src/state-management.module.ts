import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { DomainStateComponent } from './components/api-state/api-state.component';
import { ErrorComponent } from './components/error/error.component';
import { GraphQLStoreCreatorService } from './services/graphql-store-creator.service';
import { StateManagementService } from './services/state-management.service';

const Components = [DomainStateComponent, ErrorComponent];

/**
 * State management tools intended to work with Akita
 */
@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    ProgressBarModule,
    MessageModule,
    AccordionModule,
    HttpClientModule,
  ],
  providers: [StateManagementService, GraphQLStoreCreatorService],
  exports: [Components],
})
export class StateManagementModule {}
