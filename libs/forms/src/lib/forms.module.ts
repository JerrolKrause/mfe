import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpinnerModule } from 'primeng/spinner';
import { TooltipModule } from 'primeng/tooltip';

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FilterFieldComponent } from './components/filter-field/filter-field.component';
import { TextComponent } from './components/form-fields';
import { DateComponent } from './components/form-fields/date/date.component';
import { DropdownComponent } from './components/form-fields/dropdown/dropdown.component';
import { EmailComponent } from './components/form-fields/email/email.component';
import { InputComponent } from './components/form-fields/input/input.component';
import { NumberComponent } from './components/form-fields/number/number.component';
import { PhonenumberComponent } from './components/form-fields/phonenumber/phonenumber.component';
import { RadioComponent } from './components/form-fields/radio/radio.component';
import { SelectButtonComponent } from './components/form-fields/select-button/select-button.component';
import { TextAreaComponent } from './components/form-fields/textarea/textarea.component';
import { ZipcodeComponent } from './components/form-fields/zipcode/zipcode.component';
import { ButtonComponent } from './components/form-generator/button/button.component';
import { ColumnComponent } from './components/form-generator/column/column.component';
import { ContainerContentComponent } from './components/form-generator/container-content/container-content.component';
import { ContainerComponent } from './components/form-generator/container/container.component';
import { ContentComponent } from './components/form-generator/content/content.component';
import { FeatureComponent } from './components/form-generator/feature/feature.component';
import { FormFieldComponent } from './components/form-generator/form-field/form-field.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { HtmlComponent } from './components/form-generator/html/html.component';
import { RowComponent } from './components/form-generator/row/row.component';
// Pipe
import { PasswordComponent } from './components/form-fields/password/password.component';
import { SlugPipe } from './pipes/slug.pipe';

// Exported form fields
const COMPONENTS = [
  FilterFieldComponent,
  AutocompleteComponent,
  CheckboxComponent,
  // New components
  TextComponent,
  DateComponent,
  SelectButtonComponent,
  DropdownComponent,
  PhonenumberComponent,
  EmailComponent,
  NumberComponent,
  RadioComponent,
  TextAreaComponent,
  ZipcodeComponent,
  InputComponent,
  PasswordComponent,
  // Form Generator
  FormGeneratorComponent,
];

// Form Generator Components
const FORMGEN = [
  ContainerComponent,
  ContainerContentComponent,
  RowComponent,
  ColumnComponent,
  HtmlComponent,
  FormFieldComponent,
  FeatureComponent,
  ContentComponent,
  ButtonComponent,
];

/**
 * A form generator library that generates HTML forms based on a configuration object or schema.
 */
@NgModule({
  declarations: [COMPONENTS, FORMGEN, SlugPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
    InputMaskModule,
    SpinnerModule,
    InputNumberModule,
    ColorPickerModule,
    InputSwitchModule,
    SelectButtonModule,
    AutoCompleteModule,
    DropdownModule,
    TooltipModule,
    FileUploadModule,
  ],
  exports: [COMPONENTS],
})
export class FormsLibModule {}
