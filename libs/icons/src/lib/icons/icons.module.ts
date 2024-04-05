import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationService } from 'primeng/api';
import { IconsComponent } from './icons.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [IconsComponent],
  providers: [ConfirmationService],
  exports: [IconsComponent],
})
export class IconsModule {}
