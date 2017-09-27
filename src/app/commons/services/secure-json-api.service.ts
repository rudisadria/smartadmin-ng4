import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions,Headers} from "@angular/http";
import { JwtHelper } from 'angular2-jwt';
import {config} from '../../shared/smartadmin.config';
import { NotificationService } from '../../shared/utils/notification.service';
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { AuthService } from 'app/commons/services/auth.service';

@Injectable()
export class SecureJsonApiService {
  
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private http: Http,private notificationService: NotificationService,private authService:AuthService) {
    
  } 
  
  public secureGet(url): Observable<any>{
    if (this.jwtHelper.isTokenExpired(this.authService.getAccessToken())) {
//    if (true) {
      return this.authService.sendRefreshToken().flatMap((response:Response)=>
        {            
            this.authService.storeNewAccessToken(response);
            return this.httpGet(url);
        })
    }
    else
      {
      return this.httpGet(url);
    }
  }  
  
  private httpGet(url): Observable<any>{
    return this.http.get(this.getBaseUrl() + config.API_URL + url,this.createSecureHeader())
      .map(this.extractData)
      .catch(this.handleError)
  }

  private createSecureHeader(): RequestOptions
  {
    const headersData:Headers = new Headers();
    const accessToken:string = this.authService.getAccessToken();       
    headersData.append('Authorization','Bearer ' + accessToken);
    const requestOption: RequestOptions = new RequestOptions({headers: headersData});
    return requestOption;
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


