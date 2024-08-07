import { FormsLibModule } from '$forms';
import { IconsModule } from '$icons';
import { MasterpageModule } from '$masterpage';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
// Assets Resources
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { AssetsComponent } from './assets.component';
import { appRoutes } from './assets.routes';
import { AssetsFormComponent } from './components/assets-form/assets-form.component';
import { AssetsTableComponent } from './components/assets-table/assets-table.component';
import { VehicleLookupModalComponent } from './components/vehicle-lookup-modal/vehicle-lookup-modal.component';
import { AssetsService } from './shared/assets.services';

@NgModule({
  declarations: [
    AssetsComponent,
    AssetsFormComponent,
    AssetsTableComponent,
    VehicleLookupModalComponent,
  ],
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
    SelectButtonModule,
    InputTextModule,
  ],
  providers: [AssetsService, DialogService],
  bootstrap: [AssetsComponent],
})
export class AssetsModule {}
