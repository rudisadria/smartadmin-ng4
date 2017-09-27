import { Validators,AsyncValidator,AbstractControl  }                 from '@angular/forms';
import {Observable} from 'rxjs/Rx';


export class RestValidator implements AsyncValidator {
    constructor(url:string){
      console.log('constructor rest validator');
    }
    
    validate(control: AbstractControl):Observable<{[key: string]: any}> {
        console.log('trigger pertama async validator:'+control.value+",");
        return Observable.timer(700).switchMap(()=>{
            console.log('test async validator');

            //ganti dengan service yang manggil http return this._service.checkEmail({email: control.value})
//            return Observable.of({ 'asyncInvalid': true,'testErrorLagi':true });
            return Observable.of(null);
          });
    }
  }