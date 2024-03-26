
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MasterpageComponent } from './masterpage.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [MasterpageComponent ],
  providers: [],
  exports: [MasterpageComponent],
})
export class MasterpageModule {}
