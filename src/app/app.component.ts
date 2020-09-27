import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { OauthService } from './login/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{

  userLoggedIn = null;

  constructor(private oauthService: OauthService) { 
    this.userLoggedIn = oauthService.loggerInUser;
  }

  ngOnInit(): void {  
    this.oauthService.loginChanged.subscribe(userLoggedIn => {
      console.log(userLoggedIn)
      this.userLoggedIn = userLoggedIn
    })
  }

  OnLoginButtonClick()  {
    this.oauthService.Login()
  }
}