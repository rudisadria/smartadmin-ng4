import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions,Headers} from "@angular/http";

import {config} from '../../shared/smartadmin.config';
import { NotificationService } from '../../shared/utils/notification.service';
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class JsonApiService {
  
  constructor(private http: Http,private notificationService: NotificationService) {
    
  }

  //async
  public unsecureGet(url): Observable<any>{
    return this.http.get(this.getBaseUrl() + config.API_URL + url)
      .map(this.extractData)
      .catch(this.handleError)
  }  
 
  public login(url:string,body:any,headersData:Headers): Observable<any>{      
     const requestOption: RequestOptions = new RequestOptions({headers: headersData});
     
    return this.http.post(url,body,requestOption)
      .map(this.extractData)
      .catch(this.handleError)
  }    
  
  private getBaseUrl(){
    return location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') + '/'
  }

  private extractData(res:Response) {
    const body = res.json();
    if (body){
      return body.data || body
    } else {
      return {}
    }
  }

  private handleError = (error:Response) => {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const httpError = error.status ? error.status : "";
    const errorDescription = (error.json().error_description) ? error.json().error_description : 'Server error';
    
    const errMsg = httpError + "-" + errorDescription;
    console.error(errMsg); // log to console instead
    this.notificationService.error("Error "+error.status,errorDescription);
    return Observable.throw(errMsg);
  }

}


