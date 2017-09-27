import { formLayoutsRouting } from '../../../../+forms/+form-layouts/form-layouts.routing';
import { SmartadminModule } from '../../../smartadmin.module';
import { SmartadminInputModule } from '../../input/smartadmin-input.module';
import { SmartadminFormsModule } from '../../smartadmin-forms.module';
import { SmartadminValidationModule } from '../../validation/smartadmin-validation.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { ControlMessages } from './controlMessage';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule }          from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: DynamicFormComponent
}];
export const routing = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,    
    FormsModule,
    routing,
    SmartadminModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    SmartadminFormsModule,
    ReactiveFormsModule 
  ],
  exports:[DynamicFormComponent,ControlMessages],
  providers: [],
  declarations: [DynamicFormComponent,ControlMessages]
})
export class DynamicFormModule { }
