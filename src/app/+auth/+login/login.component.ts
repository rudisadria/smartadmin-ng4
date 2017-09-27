import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'app/commons/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  username:string;
  password:string;
  remember:boolean;
  disableSignInButton:boolean=false;
  
  constructor(private router: Router,private auth: AuthService) {

   }

  ngOnInit() {
  }

  login(event){
    event.preventDefault();
    this.disableSignInButton = true;
    this.auth.login(this.username,this.password,this.remember,this.disableSignInButton);
  }

}
