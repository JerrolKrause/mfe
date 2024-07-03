import { FormsLibModule } from '$forms';
import { IconsModule } from '$icons';
import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// PrimeNG Modules
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { AssetsComponent } from './assets.component';
import { appRoutes } from './assets.routes';
import { AssetsFormComponent } from './components/assets-form/assets-form.component';
import { AssetsService } from './shared/assets.services';

@NgModule({
  declarations: [AssetsComponent, AssetsFormComponent],
  imports: [
    CommonModule,
    IconsModule,
    FormsLibModule,
    MasterpageModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes),
    CardModule,
    TableModule,
    CheckboxModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
  ],
  providers: [AssetsService],
  bootstrap: [AssetsComponent],
})
export class AssetsModule {}
