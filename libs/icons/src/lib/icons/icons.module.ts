import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsComponent } from './icons.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [IconsComponent],
  providers: [],
  exports: [IconsComponent],
})
export class IconsModule {}
