import { Component, Input } from '@angular/core';
import { SigmaFields} from './dynamic-form.component';
import { FormGroup,FormControl,Validators,AsyncValidator,FormBuilder,AbstractControl  }                 from '@angular/forms';

@Component({
    selector: 'control-messages',
    template: `<span *ngIf="errorMessage !== null" class="help-block has-error"><i class="fa fa-warning"></i>{{errorMessage}}</span>`
  })
  export class ControlMessages {
    
    @Input() control: FormControl;
    @Input() field: SigmaFields;
    
    
    constructor() { }

    get errorMessage() {
        
      for (let propertyName in this.control.errors) {
         return this.field.validationMessage[propertyName];  
      }
      
      return null;
    }
  }