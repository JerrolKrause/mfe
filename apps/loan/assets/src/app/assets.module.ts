import { FormsLibModule } from '$forms';
import { IconsModule } from '$icons';
import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AssetsComponent } from './assets.component';
import { appRoutes } from './assets.routes';

@NgModule({
  declarations: [AssetsComponent],
  imports: [
    CommonModule,
    IconsModule,
    FormsLibModule,
    MasterpageModule,
    RouterModule.forChild(appRoutes),
    CardModule,
  ],
  providers: [],
  bootstrap: [AssetsComponent],
})
export class AssetsModule {}
