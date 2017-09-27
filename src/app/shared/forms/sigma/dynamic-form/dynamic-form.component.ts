import { JsonApiService } from '../../../../core/api/json-api.service';
import { Component, Input } from '@angular/core';
import { FormGroup,FormControl,Validators,AsyncValidator,FormBuilder,AbstractControl  }                 from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {Control} from 'angular2/common';
import { RestValidator } from 'app/commons/validators/rest.validator';

@Component({
  selector: 'sigma-form',
  templateUrl:"./dynamic-form.component.html"
})
export class DynamicFormComponent{
    form: FormGroup;
    sigmaForm:SigmaForm = new SigmaForm();
    
    testAja:string;
      
    constructor(private jsonApiService: JsonApiService,private fb: FormBuilder) {
      this.jsonApiService.unsecureGet('/dynamic-form.json').subscribe(response=> {
          let group: any = {};

        this.sigmaForm = response;
        this.sigmaForm.fields.forEach(fields=>{
            fields.validationMessage = {};
            let validators: Array<any> = [];
            let asyncValidators: Array<any> = [];
            if(fields.validator)
                {
                fields.validator.forEach(validator=>{
                    if(validator.type === 'required')
                    {
                        validators.push(Validators.required);
                    }
                    if(validator.type === 'rest')
                    {
                        console.log('push rest validator');
                        let restValidator:RestValidator = new RestValidator(validator.path);
                        asyncValidators.push(restValidator);
                    }                    
                    fields.validationMessage[validator.type]=validator.message;
                });                
                }
        
            let formControl:FormControl = new FormControl(fields.value,validators,asyncValidators);
            group[fields.code] = formControl;
        });
        this.form = new FormGroup(group);
      });
  }    
    
    onClick(event)
    {
        event.preventDefault();
//        this.form.updateValueAndValidity();
        
//        console.log(JSON.stringify(this.sigmaForm.fields));
//        console.log(JSON.stringify(this.form.value));
        for (let fs of this.sigmaForm.fields) {
//            fs.value = 'BERUBAH LOH';
            this.form.get(fs.code).markAsTouched();
        }        
    }
    
}

// export class RestValidator implements AsyncValidator {
//     constructor(url:string){}
    
//     validate(control: AbstractControl):Observable<{[key: string]: any}> {
//         console.log('trigger pertama async validator:'+control.value+",");
//         return Observable.timer(700).switchMap(()=>{
//             console.log('test async validator');
//             //ganti dengan service yang manggil http return this._service.checkEmail({email: control.value})
// //            return Observable.of({ 'asyncInvalid': true,'testErrorLagi':true });
//             return Observable.of(null);
//           });
//     }
//   }


export class SigmaForm {
  header: string;
  fields: SigmaFields[]
}

export class SigmaValidator {
    type: string;
    message: string;
    path: string;
  }

export class SigmaFields {
    code: string;
    grid: string;
    icon: string;
    label: string;
    placeholder: string;
    maxlength: string;
    minlength: string;
    disabled: string;
    tooltip: string;
    popover: string;
    value: string;
    inputType: string;
    name:string;
    validator:SigmaValidator[];
    validationMessage: any = {};
}