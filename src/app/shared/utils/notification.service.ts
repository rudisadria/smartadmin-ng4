import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  smallBox(data, cb?) {
    $.smallBox(data, cb)
  }

  bigBox(data, cb?) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data, cb?) {
    $.SmartMessageBox(data, cb)
  }
  
  warning(title:string,content:string)
  {
    this.bigBox({
        title: title,
        content: content,
        color: "#C79121",
        //timeout: 8000,
        icon: "fa fa-warning fadeInLeft animated"
      });
  }
  
  error(title:string,content:string)
  {
    this.bigBox({
        title: title,
        content: content,
        color: "#C46A69",
        //timeout: 8000,
        icon: "fa fa-times fadeInLeft animated"
      });
  }

}
