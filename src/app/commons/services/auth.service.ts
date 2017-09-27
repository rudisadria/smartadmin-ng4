import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions,Headers,URLSearchParams} from "@angular/http";
import { CanActivate, Router, ActivatedRoute,UrlSegment,ActivatedRouteSnapshot,RouterStateSnapshot  } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import * as CryptoJS from 'crypto-js';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { JsonApiService } from 'app/core/api/json-api.service';
import { NotificationService } from 'app/shared/utils/notification.service';
import { EncryptionService } from 'app/commons/services/encryption.service';
import { User } from 'app/commons/models/user';
import { CONFIG } from 'app/app.constant';

@Injectable()
export class AuthService implements CanActivate {

  jwtHelper: JwtHelper = new JwtHelper();
  
  public authorizationHeader: string = btoa(CONFIG.security.clientId+':'+CONFIG.security.clientSecret);

  constructor(private router: Router,public jsonService: JsonApiService,private idle: Idle,private notificationService: NotificationService,private http: Http,private encryptionService:EncryptionService,private activatedRoute:ActivatedRoute,private location:Location) 
  { 
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(CONFIG.session.timeout);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); 
     
    idle.onTimeout.subscribe(() => {
          console.log('Timeout');
          this.logout();
      this.notificationService.warning("Expired Session","Your Session already Expired, Please relogin");
    });
    
      if(this.isAlreadyLoginWithRememberMe())
      {
        this.router.navigate(['/home']);

    }  
  }
  
  private generateHeaders(): Headers
  {
      const headers: Headers = new Headers();
      headers.set('Authorization','Basic ' + this.authorizationHeader);
      headers.set('Content-type','application/x-www-form-urlencoded; charset=utf-8');
      return headers;
  }
  
  private generateUser(username:string,password:string,remember:boolean): User
  {
      const user: User = new User();
      user.client_id=CONFIG.security.clientId;
      user.client_secret=CONFIG.security.clientSecret;
      user.grant_type='password';
      user.password=password;
      user.username=username;
      user.remember = remember;
      return user;
  }
  
  private generateLoginBody(user:User): string
  {

      const param = new URLSearchParams();
      param.append('client_id', user.client_id);
      param.append('client_secret', user.client_secret);
      param.append('grant_type', user.grant_type);
      param.append('password', user.password);
      param.append('username', user.username);
  
      return param.toString();
  }
  
  login(username:string,password:string,remember:boolean,disableSignInButton:boolean): void {  
    const user: User = this.generateUser(username, password, remember);
    
    this.jsonService.login('http://localhost:8080/service-security/oauth/token',this.generateLoginBody(user),this.generateHeaders()).subscribe(
      //sukses
      response=> {
      user.access_token = response.access_token;
      user.refresh_token = response.refresh_token;
      user.password=this.encryptionService.doEncrypt(password);
      user.jti = response.jti;
      localStorage.setItem('authenticatedUser', JSON.stringify(user));
      if(remember=false)
          {
          console.log("starting idle timer");
          this.idle.watch();
        }
          
      this.router.navigate(['/home']);
      disableSignInButton=false;
    },
    //gagal
      response=> {
        disableSignInButton = false;
      }
    );
  }

  logout(): void {
    console.log('Timer Stop');
    this.idle.stop();
    this.clearUserCredential();
    this.router.navigate(['/login']);
  }
  
//  public isAlreadyLogin(): boolean{
//     if (localStorage.getItem('authenticatedUser')) {
//            // logged in so return true
//       const user:User = JSON.parse(localStorage.getItem('authenticatedUser'));
//       if(this.jwtHelper.isTokenExpired(user.access_token))
//       {
//         this.clearUserCredential();
//          return false;
//       }
//       return true;
//     }
//    return false;
//  }
  
    public isAlreadyLoginWithRememberMe(): boolean{
    let user:User = this.getUserFromStorage();
    if(user)
    {
        if(user.remember)
            return true;
        else if (!this.jwtHelper.isTokenExpired(user.access_token))
            return true;
        else if (!this.jwtHelper.isTokenExpired(user.refresh_token))
            return true;
    }
     this.logout();
    return false;
  } 
  
  public getUserFromStorage():User
  {
      if (localStorage.getItem('authenticatedUser')) {
            // logged in so return true
       const user:User = JSON.parse(localStorage.getItem('authenticatedUser'));
       return user;
     }
    return null;
}
  
  public getAccessToken():string
  {
    if (localStorage.getItem('authenticatedUser')) {
            // logged in so return true
       const user:User = JSON.parse(localStorage.getItem('authenticatedUser'));
       return user.access_token;
     }
    return null;
  }
  
    public getRefreshToken():string
  {
    if (localStorage.getItem('authenticatedUser')) {
            // logged in so return true
       const user:User = JSON.parse(localStorage.getItem('authenticatedUser'));
       return user.refresh_token;
     }
    return null;
  }
  
  private clearUserCredential():void
  {
    if (localStorage.getItem('authenticatedUser')) {
      localStorage.removeItem('authenticatedUser');
    }
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log(JSON.stringify(state.url));
        if (this.isAlreadyLoginWithRememberMe()) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }  
  
  public sendRefreshToken(): Observable<Response>
  {
      const headers: Headers = new Headers();

      headers.set('Authorization', 'Basic ' + this.authorizationHeader);
      headers.set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
      const requestOption: RequestOptions = new RequestOptions({headers: headers});
      const param = new URLSearchParams();    
      param.append('refresh_token', this.getRefreshToken());
      param.append('grant_type', 'refresh_token');

      const body = param.toString();
      return this.http.post('http://localhost:8080/service-security/oauth/token', body, requestOption);
  }
  
  public storeNewAccessToken(response:Response):void
  {
      let body = response.json();
      if(response.status = 200)
        {
              const user:User = JSON.parse(localStorage.getItem('authenticatedUser'));        
      user.access_token = body.access_token;
      user.refresh_token = body.refresh_token;
      user.jti = body.jti;
      localStorage.setItem('authenticatedUser', JSON.stringify(user));
      }
  }
}

