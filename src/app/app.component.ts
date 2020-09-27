import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { OauthService } from './oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{

  userLoggedIn = false;

  constructor(private oauthService: OauthService) { }

  ngOnInit(): void {  
    this.oauthService.loginChanged.subscribe(userLoggedIn => this.userLoggedIn = userLoggedIn)
  }

  OnLoginButtonClick()  {
    this.oauthService.Login()
  }
}