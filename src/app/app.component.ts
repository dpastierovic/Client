import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { OauthService } from './login/oauth.service';
import { User } from './login/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{

  userLoggedIn : User = null

  constructor(private oauthService: OauthService) {  }

  ngOnInit(): void {
    this.userLoggedIn = this.oauthService.loggedInUser
    console.log(this.userLoggedIn)
    this.oauthService.loginChanged.subscribe(userLoggedIn => {
      console.log(userLoggedIn)
      this.userLoggedIn = userLoggedIn
    })
  }

  OnLoginButtonClick()  {
    this.oauthService.Login()
  }
}