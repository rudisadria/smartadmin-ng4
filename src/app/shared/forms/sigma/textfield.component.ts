

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'sigma-input',
  template: 
    `
    <div class="row">
      <section class="col col-6">
        <label class="input"> <i class="icon-prepend fa fa-user"></i>
          <input type="text" name="{{name}}" placeholder="{{placeHolder}}" [value]="value" (valueChange)="valueChangeEvent($event)">
        </label>
      </section>
    </div>
    `
})
export class SigmaTextfieldComponent{
  @Input() control: FormControl;
  @Input() value: string;
  @Input() public name = "";
  @Input() public placeHolder = "";
  @Input() public textValue = "";

  @Output() valueChange:EventEmitter<string> = new EventEmitter();

    constructor() {
  }

  valueChangeEvent(event) {
    console.log('adadasdsda'+JSON.stringify(event));
    this.valueChange.emit('hihihiihi');
  }
}